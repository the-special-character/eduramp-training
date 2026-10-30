import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

// Current session, or null when signed out.
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

// Use in protected pages: returns the session or sends the user to /login.
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

// The Express API's JWT, for calling its protected routes from the server.
export async function getBackendToken() {
  const { token } = await auth.api.getBackendToken({ headers: await headers() });
  return token;
}
