# 🚀 Scaffold React Vite

A simple CLI tool to scaffold a new **React + Vite + TypeScript** project using a customizable base template.

This tool helps you quickly spin up a new project, rename metadata, initialize Git, and get straight to coding.

---

## ✨ Features

* 📁 Clone a boilerplate React + Vite + TypeScript project
* 📝 Rename `package.json` and `index.html` based on your project name
* 🔧 Auto-init Git with `main` branch
* 📄 Generate `.gitignore` with sensible defaults
* ⚡ Built for `pnpm`
* 📦 Bundles with `esbuild` for fast, single-file deployment

---

## 🛠️ Usage Guide

### 1️⃣ Clone & Run in Dev Mode

```bash
pnpm install
pnpm run dev
```

🧠 You'll be prompted to enter a project name. The tool will:

* Create a new folder using the name
* Clone the base template repo
* Update `package.json` and `index.html`
* Initialize Git with branch `main`

---

### 2️⃣ Build for Production

```bash
pnpm run build
```

This uses `esbuild` to generate a bundled file:

```
dist/create-myapp.cjs
```

This file is a single-file CLI executable.

---

### 3️⃣ Run the CLI Locally

```bash
node dist/create-myapp.cjs
```

Or, if you prefer make it executable:

```bash
chmod +x dist/create-myapp.cjs
./dist/create-myapp.cjs
```

---

### 4️⃣ Package and Install Globally via `.tgz`

🔔 **Note:** A `.tgz` file is already committed to the repo. So after cloning, you can immediately install the CLI globally:

```bash
npm install -g ./scaffold-react-vite-[version_placeholder].tgz
```

✅ You'll now be able to run:

```bash
scaffold-react-vite
```

**but**

🛠️ **Want to regenerate the `.tgz` file from scratch?**

make sure already run ```npm install``` and run **step number 2**, then run:

```bash
npm pack
```

This will produce new:

```
scaffold-react-vite-[version_placeholder].tgz
```

You can then install it globally again:

```bash
npm install -g ./scaffold-react-vite-[version_placeholder].tgz
```

---

### 5️⃣ Optional: Local Dev Install with `npm link`

```bash
npm link
```

🔗 This links the command globally based on the `bin` field in your `package.json`.
Great for real-time testing during development.

---

## 🔧 Customizing the Template Source

By default, the template repo is:

```js
const template_name = "labibimamhidayat/base-template-vite-react-typescript";
```

To use your own GitHub repo (e.g., your team’s custom template), just replace the above line in `index.js`.

🛠️ After changing it, repeat the steps above to rebuild and repack the CLI into a new `.tgz` file.

---

## 🧪 Project Structure

```bash
.
├── index.js               # Main CLI script (ESM)
├── build.mjs              # Esbuild bundling script
├── dist/
│   └── create-myapp.cjs   # Bundled CLI output
├── package.json           # CLI config & bin declaration
└── scaffold-react-vite-[version_placeholder].tgz  # Optional prebuilt archive
```

---

## 📝 License

MIT

---

Happy hacking! 🎉🚀
