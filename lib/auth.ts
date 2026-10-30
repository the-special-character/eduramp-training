import 'server-only'

import { betterAuth } from "better-auth";
import { expressBackend } from './auth/backend-plugin';
import { nextCookies } from 'better-auth/next-js';

const SESSION_MAX_AGE = 60 * 60 * 24;

export const auth = betterAuth({
  session: {
    expiresIn: SESSION_MAX_AGE,
    cookieCache: {
      enabled: true,
      strategy: "jwe",
      maxAge: SESSION_MAX_AGE
    }
  },
  user: {
    additionalFields: {
      role: { type: "string", input: false }
    }
  },
  plugins: [
      expressBackend(),
      nextCookies(),
  ]
});

export type Session = typeof auth.$Infer.Session