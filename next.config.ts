import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep CLAUDE.md as the project's own curated build rules — don't let
  // `next dev` append its internal agent-rules block to it.
  agentRules: false,
};

export default nextConfig;
