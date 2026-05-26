import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const inlineBuildAssets = (): Plugin => ({
  name: "inline-build-assets",
  apply: "build",
  enforce: "post",
  generateBundle(_options, bundle) {
    const htmlAsset = bundle["index.html"];

    if (!htmlAsset || htmlAsset.type !== "asset") return;

    let html = String(htmlAsset.source);

    for (const [fileName, output] of Object.entries(bundle)) {
      if (output.type === "chunk" && fileName.endsWith(".js")) {
        const scriptPattern = new RegExp(
          `<script[^>]*src=["']\\./${escapeRegExp(fileName)}["'][^>]*></script>`
        );

        const code = output.code
          .replace(/__VITE_PRELOAD__/g, "void 0")
          .replace(/<\/script/gi, "<\\/script");

        html = html.replace(
          scriptPattern,
          () => `<script type="module">\n${code}\n</script>`
        );

        delete bundle[fileName];
      }

      if (output.type === "asset" && fileName.endsWith(".css")) {
        const linkPattern = new RegExp(
          `<link[^>]*href=["']\\./${escapeRegExp(fileName)}["'][^>]*>`
        );

        html = html.replace(linkPattern, () =>
          `<style>\n${String(output.source).replace(
            /<\/style/gi,
            "<\\/style"
          )}\n</style>`
        );

        delete bundle[fileName];
      }
    }

    htmlAsset.source = html;
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), inlineBuildAssets()],
  build: {
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
