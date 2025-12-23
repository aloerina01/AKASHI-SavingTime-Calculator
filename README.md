# AKASHI-SavingTime-Calculator

AKASHIの残業時間を計算するChrome拡張機能

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### ビルド

```bash
# 本番ビルド
npm run build

# 開発モード（ファイル変更を監視）
npm run dev
```

ビルド後、`dist`ディレクトリに拡張機能のファイルが生成されます。

## Chrome拡張機能の読み込み

1. Chromeで `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `dist`ディレクトリを選択

## プロジェクト構造

```
.
├── src/
│   ├── manifest.json      # Chrome拡張機能のマニフェスト
│   ├── background.ts      # バックグラウンドスクリプト
│   ├── content.ts         # コンテンツスクリプト
│   ├── popup.ts           # ポップアップスクリプト
│   └── popup.html         # ポップアップHTML
├── dist/                  # ビルド出力（gitignore）
├── build.js               # esbuildビルドスクリプト
├── tsconfig.json          # TypeScript設定
└── package.json
```

## 技術スタック

- TypeScript
- esbuild（バンドラー）