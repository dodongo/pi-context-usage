import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerContextCommand } from "./context";

export * from "./context/tokens";
export * from "./context/grid";
export * from "./context/breakdown";

export default function (pi: ExtensionAPI) {
  let effectiveSystemPrompt: string | undefined;

  pi.on("session_start", () => {
    effectiveSystemPrompt = undefined;
  });
  pi.on("before_agent_start", (event) => {
    effectiveSystemPrompt = event.systemPrompt;
  });

  registerContextCommand(pi, (ctx) => effectiveSystemPrompt ?? ctx.getSystemPrompt());
}
