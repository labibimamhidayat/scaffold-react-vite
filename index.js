#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import readline from "readline";
import degit from "degit";

const template_name = "labibimamhidayat/base-template-vite-react-typescript";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

async function run() {
  const projectName = (await ask("Project name: ")).trim();
  rl.close();

  const targetPath = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetPath)) {
    console.error(
      `❌ Folder "${projectName}" already exists. Please remove it or choose a different name.`
    );
    process.exit(1);
  }

  console.log(`\n📦 Creating project in ${targetPath}...`);

  try {
    const emitter = degit(template_name, {
      cache: false,
      force: true,
      verbose: true,
    });
    await emitter.clone(projectName);
    console.log("✅ Template cloned successfully");
  } catch (err) {
    console.error("\n❌ Failed to clone template using degit:", err.message);
    process.exit(1);
  }

  // Update package.json name
  const pkgPath = path.join(targetPath, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.name = projectName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log("✅ package.json updated");
  }

  // Update index.html title if exists
  const indexHtmlPath = path.join(targetPath, "index.html");
  if (fs.existsSync(indexHtmlPath)) {
    let html = fs.readFileSync(indexHtmlPath, "utf8");
    html = html.replace(
      /<title>(.*?)<\/title>/,
      `<title>${projectName}</title>`
    );
    fs.writeFileSync(indexHtmlPath, html);
    console.log("✅ index.html title updated \n");
  }

  // Initialize git with main as default branch
  try {
    execSync(`git init --initial-branch=main`, {
      cwd: targetPath,
      stdio: "inherit",
    });
    console.log('✅ Git initialized with "main" branch');
    console.log(`🔗 Don't forget to add your git remote:`);
    console.log(`  git remote add origin <your-repo-url>`);
    console.log(`  git push -u origin main`);
  } catch (err) {
    console.error("\n⚠️ Failed to initialize git repository.");
  }

  console.log(`\n🚀 All set! Now run:`);
  console.log(`  cd ${projectName}`);
  console.log(`  pnpm install`);
  console.log(`  pnpm run dev`);
  process.exit(0);
}

run();
