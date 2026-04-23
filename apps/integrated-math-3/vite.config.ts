import "dotenv/config";
import vinext from "vinext";
import { defineConfig } from "vite";

async function loadPlugins() {
  const plugins = [vinext()];
  try {
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'vendor-charts';
            }
            if (id.includes('katex')) {
              return 'vendor-katex';
            }
            if (id.includes('@hello-pangea/dnd')) {
              return 'vendor-dnd';
            }
            if (id.includes('react-markdown') || id.includes('remark-gfm') || id.includes('rehype-') || id.includes('mdast-') || id.includes('unified')) {
              return 'vendor-markdown';
            }
            if (id.includes('convex')) {
              return 'vendor-convex';
            }
          }
        },
      },
    },
  },
}));
