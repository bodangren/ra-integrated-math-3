import "dotenv/config";
import vinext from "vinext";
import { defineConfig } from "vite";

async function loadPlugins() {
  const plugins = [vinext()];
  try {
    // @ts-expect-error -- optional dependency, installed only for Cloudflare deployment
    const { cloudflare } = await import("@cloudflare/vite-plugin");
    plugins.push(cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }));
  } catch {
    // @cloudflare/vite-plugin not installed — skip for local builds
  }
  return plugins;
}

export default defineConfig(async () => ({
  plugins: await loadPlugins(),
}));
