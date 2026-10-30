// Calls to the Express API (../src). Server-only: the browser never talks to
// the Express API directly, it goes through Better Auth's route handler.
import "server-only";

export type BackendUser = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
};

export type AuthResult = { user: BackendUser; accessToken: string };

type ErrorBody = {
  success: false;
  message?: string;
  details?: { field: string; message: string }[];
};

export class BackendError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "BackendError";
  }
}

const BASE_URL = process.env.BACKEND_API_URL ?? "http://localhost:8080/api";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init.headers },
      cache: "no-store",
    });
  } catch {
    throw new BackendError(503, "Cannot reach the API server. Is it running?");
  }

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const err = body as ErrorBody | null;
    // Validation errors come back as a list; show each field's message.
    const message = err?.details?.length
      ? err.details.map((d) => d.message).join(". ")
      : (err?.message ?? `Request failed with status ${res.status}`);
    throw new BackendError(res.status, message);
  }

  return (body as { data: T }).data;
}

// POST /api/auth/login
export function backendLogin(input: { email: string; password: string }) {
  return request<AuthResult>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// POST /api/auth/register
export function backendRegister(input: { name: string; email: string; password: string }) {
  return request<AuthResult>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// // GET /api/auth/me (protected) - uses the JWT from login/register.
// export function backendMe(token: string) {
//   return request<{ user: BackendUser & { productCount: number } }>("/auth/me", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// }
