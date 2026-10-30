import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { expressBackendClient } from "./auth/backend-plugin-client";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [expressBackendClient(), inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
