import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  ssr: { noExternal: ["@lucide/svelte"] },
  plugins: [
    sveltekit({
      adapter: adapter(),
      paths: { base: process.env.MARKETING_BASE_PATH || "" },
    }),
  ],
});
