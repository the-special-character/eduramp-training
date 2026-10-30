import * as z from "zod";
import type { BetterAuthPlugin, GenericEndpointContext } from "better-auth";
import {
  APIError,
  createAuthEndpoint,
  createAuthMiddleware,
  formCsrfMiddleware,
  sessionMiddleware,
} from "better-auth/api";
import { expireCookie, setSessionCookie } from "better-auth/cookies";
import "server-only";
import { AuthResult, BackendError, backendLogin, backendRegister } from "../backend";


const BACKEND_TOKEN_COOCKIE = "backend_token"

function toAPIError(err: unknown): APIError {
  if (err instanceof BackendError) {
    const status =
      (
        {
          400: "BAD_REQUEST",
          401: "UNAUTHORIZED",
          403: "FORBIDDEN",
          409: "CONFLICT",
          429: "TOO_MANY_REQUESTS",
          503: "SERVICE_UNAVAILABLE",
        } as const
      )[err.status] ?? "BAD_GATEWAY";
    return new APIError(status, { message: err.message });
  }
  return new APIError("INTERNAL_SERVER_ERROR", { message: "Something went wrong" });
}

async function startSession(
  ctx: GenericEndpointContext,
  result: AuthResult,
  rememberMe: boolean,
) {
  const { user: apiUser, accessToken } = result;

  const user = {
    id: String(apiUser.id),
    name: apiUser.name,
    email: apiUser.email,
    emailVerified: false,
    image: null,
    role: apiUser.role,
    createdAt: new Date(apiUser.createdAt),
    updatedAt: new Date(apiUser.updatedAt),
  };

  const session = await ctx.context.internalAdapter.createSession(user.id, !rememberMe);
  if(!session) {
    throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to create session"})
  }

  await setSessionCookie(ctx, { session, user}, !rememberMe);

  const cookie = ctx.context.createAuthCookie(BACKEND_TOKEN_COOCKIE, {
    maxAge: rememberMe ? ctx.context.sessionConfig.expiresIn : undefined
  });

  await ctx.setSignedCookie(cookie.name, accessToken, ctx.context.secret, cookie.attributes)

  return ctx.json({ user });
}


export const expressBackend = () =>
  ({
    id: "express-backend",
    endpoints: {
      // authClient.signIn.backend({ email, password })
      signInBackend: createAuthEndpoint(
        "/sign-in/backend",
        {
          method: "POST",
          use: [formCsrfMiddleware], // block cross-site login attempts
          body: z.object({
            email: z.string(),
            password: z.string(),
            rememberMe: z.boolean().optional(),
          }),
        },
        async (ctx) => {
          const { email, password, rememberMe = true } = ctx.body;
          let result: AuthResult;
          try {
            result = await backendLogin({ email, password });
          } catch (err) {
            throw toAPIError(err);
          }
          return startSession(ctx, result, rememberMe);
        },
      ),

      // authClient.signUp.backend({ name, email, password })
      signUpBackend: createAuthEndpoint(
        "/sign-up/backend",
        {
          method: "POST",
          use: [formCsrfMiddleware],
          body: z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
          }),
        },
        async (ctx) => {
          let result: AuthResult;
          try {
            result = await backendRegister(ctx.body);
          } catch (err) {
            throw toAPIError(err);
          }
          return startSession(ctx, result, true);
        },
      ),

      // Server only: auth.api.getBackendToken({ headers }).
      // Not exposed over HTTP, so the token never reaches the browser.
      getBackendToken: createAuthEndpoint.serverOnly(
        { method: "GET", use: [sessionMiddleware] },
        async (ctx) => {
          const cookie = ctx.context.createAuthCookie(BACKEND_TOKEN_COOCKIE);
          const token = await ctx.getSignedCookie(cookie.name, ctx.context.secret);
          return { token: token || null };
        },
      ),
    },
    hooks: {
      after: [
        {
          // Remove the API token cookie whenever the user signs out.
          matcher: (ctx) => ctx.path === "/sign-out",
          handler: createAuthMiddleware(async (ctx) => {
            expireCookie(ctx, ctx.context.createAuthCookie(BACKEND_TOKEN_COOCKIE));
          }),
        },
      ],
    },
  }) satisfies BetterAuthPlugin;
