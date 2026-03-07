# GitHub Pages 対応調査レポート

## 調査日

2026-03-07

## プロジェクト概要

- **プロジェクト名**: TOPIK単語タイピング練習
- **フレームワーク**: React 19 + TypeScript
- **ビルドツール**: Vite 7
- **ルーティング**: Wouter（クライアントサイドルーティング）
- **UIライブラリ**: shadcn/ui（Radix UI + Tailwind CSS 4）
- **パッケージマネージャー**: pnpm 10.4.1

## 調査結果

### GitHub Pages とは

GitHub Pages は、GitHub リポジトリから直接静的ウェブサイトをホスティングするサービスです。HTML、CSS、JavaScript などの静的ファイルのみをサポートし、サーバーサイドの処理（Node.js、Express など）は実行できません。

### 対応可否の判定: ✅ 対応可能

以下の理由から、GitHub Pages への対応は**可能**と判断しました。

#### 1. サーバーサイドの依存がない

- `server/index.ts` は Express を使用していますが、機能は**静的ファイルの配信**と**SPA フォールバック**（全ルートで index.html を返す）のみ
- API エンドポイントは一切存在しない
- データベースへの接続もない

#### 2. 純粋なクライアントサイドアプリケーション

- 全てのデータ（TOPIK 単語データ）は `client/src/lib/words.ts` にハードコードされている
- 進捗管理はブラウザのローカルストレージを使用（`useProgress` フック）
- サーバーとの通信は不要

#### 3. Vite によるビルドが正常に動作

- `vite build` コマンドで `dist/public/` に静的ファイルが正常に生成される
- ビルド出力:
  - `index.html` (367 KB)
  - `assets/index-*.css` (126 KB)
  - `assets/index-*.js` (534 KB)

### 対応に必要な変更点

#### 1. ベースパスの設定

GitHub Pages のプロジェクトサイトは `https://<user>.github.io/<repo>/` で公開されるため、Vite の `base` 設定でサブパスに対応する必要があります。

**変更箇所**: `vite.config.ts`

```typescript
// GitHub Pages 用のベースパス設定
base: process.env.GITHUB_PAGES ? "/topik-typing/" : "/",
```

#### 2. SPA ルーティング対応

GitHub Pages はサーバーサイドルーティングをサポートしないため、`/404` などのパスに直接アクセスすると 404 エラーが発生します。

**解決方法**: ビルド時に `index.html` を `404.html` としてもコピーすることで、GitHub Pages の 404 処理を利用して SPA ルーティングを実現します。

#### 3. GitHub Actions ワークフローの作成

自動デプロイのため、GitHub Actions ワークフロー（`.github/workflows/deploy-pages.yml`）を作成します。

- `main` ブランチへのプッシュで自動デプロイ
- pnpm を使用してビルド
- GitHub Pages にデプロイ

### 注意事項

#### 環境変数について

以下の環境変数はオプションで、設定されていなくてもアプリケーションは動作します：

| 環境変数 | 用途 | 必須 |
|---|---|---|
| `VITE_OAUTH_PORTAL_URL` | OAuth認証 | ❌（使用箇所なし） |
| `VITE_APP_ID` | OAuth認証 | ❌（使用箇所なし） |
| `VITE_FRONTEND_FORGE_API_KEY` | 地図サービス | ❌ |
| `VITE_FRONTEND_FORGE_API_URL` | 地図サービス | ❌ |
| `VITE_ANALYTICS_ENDPOINT` | Umami解析 | ❌ |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami解析 | ❌ |

#### Manus 固有のプラグインについて

- `vite-plugin-manus-runtime` と `vitePluginManusDebugCollector` は開発用のデバッグツールです
- プロダクションビルドには影響しません（`NODE_ENV=production` 時にスキップされる設計）

## 実施内容

### 変更ファイル一覧

| ファイル | 変更内容 |
|---|---|
| `vite.config.ts` | `base` 設定の追加 |
| `.github/workflows/deploy-pages.yml` | GitHub Pages デプロイワークフローの新規作成 |
| `docs/github-pages-investigation.md` | 本調査レポート |

### デプロイ手順

1. リポジトリの Settings → Pages で Source を "GitHub Actions" に設定
2. `main` ブランチにコードをプッシュ
3. GitHub Actions が自動的にビルドとデプロイを実行
4. `https://sutaa12.github.io/topik-typing/` でアクセス可能

### ローカル開発への影響

- `GITHUB_PAGES` 環境変数が設定されていない場合、`base` はデフォルトの `/` のまま
- ローカル開発（`pnpm dev`）には一切影響なし
