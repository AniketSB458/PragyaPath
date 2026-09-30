const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const SRC_DIR = path.resolve(__dirname, '../src');
const MERN_DIR = path.resolve(__dirname, '../mern-pure-javascript');
const MERN_SRC_DIR = path.join(MERN_DIR, 'src');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Convert a TS/TSX file to JS/JSX using esbuild
function convertFile(srcFile, destFile, isJsx) {
  const code = fs.readFileSync(srcFile, 'utf-8');
  try {
    const result = esbuild.transformSync(code, {
      loader: isJsx ? 'tsx' : 'ts',
      jsx: 'preserve',
      format: 'esm',
      target: 'es2022',
    });

    let transformed = result.code;
    
    // Clean up any remaining types import statements (e.g., import { ... } from '../types';)
    transformed = transformed.replace(/import\s*\{\s*\}\s*from\s*['"][^'"]*types['"];?\n?/g, '');
    transformed = transformed.replace(/import\s*type\s+[^;]+;/g, '');
    
    // Clean up empty lines at start
    transformed = transformed.trimStart();

    ensureDir(path.dirname(destFile));
    fs.writeFileSync(destFile, transformed, 'utf-8');
    console.log(`Converted: ${path.basename(srcFile)} -> ${path.basename(destFile)}`);
  } catch (err) {
    console.error(`Error converting ${srcFile}:`, err.message);
  }
}

// Recursively process directory
function processDirectory(sourceDir, targetDir) {
  ensureDir(targetDir);
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(sourceDir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(srcPath, path.join(targetDir, entry.name));
    } else if (entry.isFile()) {
      if (entry.name === 'types.ts') {
        // Types file is TS-only, skip in pure JS MERN
        continue;
      }

      if (entry.name.endsWith('.tsx')) {
        const destName = entry.name.replace(/\.tsx$/, '.jsx');
        convertFile(srcPath, path.join(targetDir, destName), true);
      } else if (entry.name.endsWith('.ts')) {
        const destName = entry.name.replace(/\.ts$/, '.js');
        convertFile(srcPath, path.join(targetDir, destName), false);
      } else {
        // Non-TS file (CSS, JSON, etc.), copy directly
        ensureDir(targetDir);
        fs.copyFileSync(srcPath, path.join(targetDir, entry.name));
        console.log(`Copied: ${entry.name}`);
      }
    }
  }
}

console.log('--- Starting Pure JavaScript MERN conversion ---');
processDirectory(SRC_DIR, MERN_SRC_DIR);

// Create index.html in mern-pure-javascript
const indexHtmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PragyaPath – Intelligent Career & Exam Navigator (MERN Stack)</title>
    <meta name="description" content="AI-powered career discovery, examination navigation, eligibility engine, personalized roadmaps, curated free learning resources, and adaptive practice platform - 100% Pure JavaScript MERN Stack." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-indigo-500 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
fs.writeFileSync(path.join(MERN_DIR, 'index.html'), indexHtmlContent, 'utf-8');

// Create vite.config.js in mern-pure-javascript
const viteConfigContent = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
`;
fs.writeFileSync(path.join(MERN_DIR, 'vite.config.js'), viteConfigContent, 'utf-8');

// Create package.json in mern-pure-javascript
const packageJsonContent = {
  name: "pragyapath-mern-pure-javascript",
  version: "1.0.0",
  private: true,
  type: "module",
  description: "PragyaPath - 100% Pure JavaScript MERN Stack (MongoDB, Express, React JSX, Node.js - No TypeScript)",
  scripts: {
    "start": "node server.js",
    "server": "node --watch server.js",
    "client": "vite",
    "dev": "vite",
    "build": "vite build"
  },
  dependencies: {
    "express": "^4.21.2",
    "mongoose": "^8.9.0",
    "dotenv": "^16.4.7",
    "cors": "^2.8.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.460.0",
    "recharts": "^2.15.0",
    "canvas-confetti": "^1.9.3",
    "@google/genai": "^0.1.1"
  },
  devDependencies: {
    "@vitejs/plugin-react": "^4.3.4",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "vite": "^6.0.0"
  }
};
fs.writeFileSync(path.join(MERN_DIR, 'package.json'), JSON.stringify(packageJsonContent, null, 2), 'utf-8');

// Create .env.example in mern-pure-javascript
const envContent = `# MERN Environment Variables (Pure JavaScript)
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/pragyapath_mern
NODE_ENV=development
# Optional Gemini AI API Key (Falls back to high-fidelity built-in career & mentor reasoning)
GEMINI_API_KEY=
`;
fs.writeFileSync(path.join(MERN_DIR, '.env.example'), envContent, 'utf-8');

// Create .gitignore in mern-pure-javascript
const gitignoreContent = `node_modules
dist
.env
.DS_Store
`;
fs.writeFileSync(path.join(MERN_DIR, '.gitignore'), gitignoreContent, 'utf-8');

// Verify that NO .tsx or .ts files exist in mern-pure-javascript
function checkNoTsFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkNoTsFiles(fullPath);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        console.error(`ERROR: TypeScript file found in MERN project: ${fullPath}`);
        fs.unlinkSync(fullPath); // Remove any accidental ts/tsx
      }
    }
  }
}
checkNoTsFiles(MERN_DIR);

console.log('--- Pure JavaScript MERN conversion completed successfully! ---');
