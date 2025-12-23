import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isWatch = process.argv.includes('--watch');

// ビルド設定
const buildOptions = {
  entryPoints: {
    'background': 'src/background.ts',
    'content': 'src/content.ts',
    'popup': 'src/popup.ts',
  },
  bundle: true,
  outdir: 'dist',
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  sourcemap: isWatch ? 'inline' : false,
  minify: !isWatch,
  logLevel: 'info',
};

// マニフェストファイルをコピー
function copyManifest() {
  const manifestPath = join(__dirname, 'src', 'manifest.json');
  const distPath = join(__dirname, 'dist', 'manifest.json');
  
  if (existsSync(manifestPath)) {
    copyFileSync(manifestPath, distPath);
    console.log('✓ manifest.json copied');
  }
}

// HTMLファイルをコピー（popup.htmlなど）
function copyHTML() {
  const htmlFiles = ['popup.html'];
  
  htmlFiles.forEach(file => {
    const srcPath = join(__dirname, 'src', file);
    const distPath = join(__dirname, 'dist', file);
    
    if (existsSync(srcPath)) {
      copyFileSync(srcPath, distPath);
      console.log(`✓ ${file} copied`);
    }
  });
}

// ビルド実行
async function build() {
  try {
    // distディレクトリが存在しない場合は作成
    if (!existsSync('dist')) {
      mkdirSync('dist', { recursive: true });
    }

    if (isWatch) {
      const ctx = await esbuild.context(buildOptions);
      await ctx.watch();
      copyManifest();
      copyHTML();
      console.log('👀 Watching for changes...');
    } else {
      await esbuild.build(buildOptions);
      copyManifest();
      copyHTML();
      console.log('✓ Build completed');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();

