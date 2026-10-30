import type { BetterAuthClientPlugin } from "better-auth/client";
import type { expressBackend } from "./backend-plugin";

// Client half of the plugin: adds authClient.signIn.backend / signUp.backend
// (typed from the server plugin) and refreshes useSession() after either one.
export const expressBackendClient = () =>
  ({
    id: "express-backend",
    $InferServerPlugin: {} as ReturnType<typeof expressBackend>,
    atomListeners: [
      {
        matcher: (path) => path === "/sign-in/backend" || path === "/sign-up/backend",
        signal: "$sessionSignal",
      },
    ],
  }) satisfies BetterAuthClientPlugin;
