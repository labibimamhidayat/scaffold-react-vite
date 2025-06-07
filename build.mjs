import { build } from "esbuild";
import { builtinModules } from 'module'

await build({
  entryPoints: ["index.js"],
  bundle: true,
  format: "cjs",
  platform: "node",
  target: "node18",
  outfile: "dist/create-myapp.cjs", // ← .cjs instead of .js
  external: builtinModules, // <-- Don't bundle Node core modules
});
