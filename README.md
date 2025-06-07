# VibeFM 🎵

VibeFMは、ユーザーの気分や感情に基づいてSpotifyから最適な音楽をレコメンドするWebサービスです。

---

## 特徴・仕様

- 💫 **気分ベースレコメンド**: テキストやプリセットから最適な音楽を即座に推薦
- 🎧 **30秒プレビュー**: Spotifyの楽曲を直接再生
- 📱 **レスポンシブデザイン**: モバイル・デスクトップ対応
- ⚡ **高速レスポンス**: 3秒以内の結果表示
- 🎨 **モダンUI**: Glassmorphismデザイン
- 🐳 **Docker/Cloud Run対応**: ローカルも本番も同一イメージで動作

---

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **バックエンド**: Next.js API Routes, Spotify Web API
- **インフラ**: Docker, Docker Compose, Google Cloud Run

---

## ディレクトリ構成

```
vibecoding/
├── src/
│   ├── app/
│   │   ├── api/recommend/       # レコメンドAPI（Next.js API Route）
│   │   ├── globals.css          # グローバルスタイル
│   │   ├── layout.tsx           # ルートレイアウト
│   │   └── page.tsx             # メインページ
│   ├── components/
│   │   ├── LoadingAnimation.tsx # ローディングUI
│   │   ├── MoodInput.tsx        # 気分入力コンポーネント
│   │   ├── RecommendationResults.tsx # 結果表示
│   │   └── TrackCard.tsx        # 楽曲カード
│   ├── lib/
│   │   ├── moodMapping.ts       # 気分→Spotifyクエリ変換
│   │   └── spotify.ts           # Spotify APIラッパー
│   └── types/
│       └── spotify.ts           # 型定義
├── public/                      # 静的ファイル（空でも必須）
├── Dockerfile                   # 本番用Dockerビルド
├── docker-compose.yml           # ローカル開発用
├── .env / .env.local            # 環境変数（SPOTIFY_CLIENT_ID等）
├── PREPARATION_CHECKLIST.md     # 事前準備チェックリスト
├── requirements.md              # 要件定義
└── ...
```

---

## ローカル開発環境

1. **環境変数の準備**
   - `.env.local` または `.env` をプロジェクトルートに作成し、下記を記載：
     ```
     SPOTIFY_CLIENT_ID=your_spotify_client_id
     SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
     ```

2. **依存パッケージのインストール**
   ```sh
   npm install
   ```

3. **開発サーバー起動**
   ```sh
   npm run dev
   # → http://localhost:3000 でアクセス
   ```

4. **Docker Composeでの起動も可能**
   ```sh
   docker-compose up --build
   # → http://localhost:3000
   ```

---

## 本番環境（Cloud Run）

### 1. Dockerイメージのビルド＆プッシュ

```sh
gcloud builds submit --tag gcr.io/<your-gcp-project-id>/vibecoding
```

### 2. Cloud Runへデプロイ

#### `.env`ファイルから環境変数を一括反映する例：

```sh
export $(cat .env | grep -v '^#' | xargs) && \
gcloud run deploy vibecoding \
  --image gcr.io/<your-gcp-project-id>/vibecoding \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --set-env-vars $(cat .env | grep -v '^#' | xargs | sed 's/ /,/g')
```

- `.env`が`.env.local`の場合は適宜読み替えてください。
- GCPコンソールのCloud Run画面からGUIで環境変数を設定することも可能です。

---

## 主要機能

- 気分や状況を入力・プリセットボタンで選択
- Spotify Web APIから最適な楽曲をレコメンド
- レコメンド結果の表示（アルバムアート・曲名・アーティスト名）
- 30秒プレビュー再生
- Spotifyで直接再生ボタン
- ローディングアニメーション・エラー時のフィードバック

---

## 環境変数一覧

- `SPOTIFY_CLIENT_ID` : Spotify Developerから取得
- `SPOTIFY_CLIENT_SECRET` : Spotify Developerから取得

（Cloud Runでは必ず環境変数として渡すこと。`.env`ファイル自体は本番イメージに含めないことを推奨）

---

## 要件・注意事項

- Cloud Run/本番環境では**環境変数が未設定だとSpotify API認証に失敗し、レコメンドが表示されません**
- `public`ディレクトリは空でも必ず必要です（Dockerビルドエラー防止）
- Spotify APIの利用にはSpotify Developer登録・アプリ作成が必要です
- 本番・ローカルともにAPIキー等の機密情報はGit管理しないでください

---

## 開発・運用フロー

- 機能ごとにfeatureブランチ作成→プルリク→mainへマージ
- mainブランチが本番用
- GitHub Actions等でCI/CD自動化も推奨

---

## サポート・質問

- 質問や問題はGitHub Issuesで受け付けています

---

## ライセンス

MIT License 