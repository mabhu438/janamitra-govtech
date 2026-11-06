import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches every page linked from the JanaMitra navigation", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    for (const path of ["/", "/documents", "/feeguard", "/scan", "/ask", "/help", "/settings", "/guest"]) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId, `${path} should resolve to a page`).not.toBe(rootRouteId);
    }
  });
});
