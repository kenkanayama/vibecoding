# VibeFM 🎵

VibeFMは、ユーザーの気分や感情に基づいて音楽をレコメンドするWebサービスです。Spotify Web APIを活用し、入力された気分に最適な楽曲を即座に提案します。

## 特徴

- 💫 **気分ベースレコメンド**: テキスト入力から最適な音楽を即座に推薦
- 🎧 **30秒プレビュー**: Spotifyの楽曲を直接再生
- 📱 **レスポンシブデザイン**: モバイル・デスクトップ対応
- ⚡ **高速レスポンス**: 3秒以内の結果表示
- 🎨 **モダンUI**: Glassmorphismデザイン採用

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **バックエンド**: Next.js API Routes
- **API**: Spotify Web API
- **デプロイ**: Docker, Google Cloud Run
- **開発環境**: Docker Compose

## セットアップ

### 1. 環境変数の設定

Spotify Developer Dashboardでアプリケーションを作成し、以下の環境変数を設定してください：

```bash
# .env.local ファイルを作成
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### 2. Docker Compose での開発

```bash
# パッケージのインストールとアプリケーションの起動
docker-compose up --build

# アプリケーションは http://localhost:3000 で利用可能
```

### 3. ローカル開発

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ビルド
npm run build

# 本番環境での起動
npm start
```

## Spotify Developer Setup

1. [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)にアクセス
2. 新しいアプリケーションを作成
3. Client IDとClient Secretを取得
4. Redirect URIsに以下を追加:
   - `http://localhost:3000` (開発環境)
   - 本番環境のURL

## 使用方法

1. **気分入力**: トップページで現在の気分や聞きたい音楽のジャンルを入力
2. **プリセット選択**: 「リラックス」「集中したい」などのプリセットボタンをクリック
3. **楽曲閲覧**: レコメンドされた楽曲のアルバムアート、アーティスト名、楽曲名を確認
4. **プレビュー再生**: 楽曲カードをホバーして30秒プレビューを再生
5. **Spotify連携**: 「Spotifyで聞く」ボタンでSpotifyアプリで楽曲を開く

## 気分キーワード例

### リラックス系
- リラックス、癒し、のんびり、落ち着く、寝る前

### エネルギッシュ系  
- 元気、やる気、楽しい、テンション上がる、ポジティブ

### 集中系
- 集中、勉強、作業、カフェ

### 天気・時間系
- 雨、晴れ、夜、朝、春、夏、秋、冬

### 運動系
- 運動、ランニング、ヨガ、ドライブ

## Docker デプロイ

### ローカルビルド

```bash
# Docker イメージをビルド
docker build -t vibefm .

# コンテナを実行
docker run -p 3000:3000 \
  -e SPOTIFY_CLIENT_ID=your_client_id \
  -e SPOTIFY_CLIENT_SECRET=your_client_secret \
  vibefm
```

### Google Cloud Run デプロイ

```bash
# Google Cloud SDKの設定
gcloud config set project your-project-id

# Docker イメージをビルドしてプッシュ
gcloud builds submit --tag gcr.io/your-project-id/vibefm

# Cloud Run にデプロイ
gcloud run deploy vibefm \
  --image gcr.io/your-project-id/vibefm \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --set-env-vars SPOTIFY_CLIENT_ID=your_client_id,SPOTIFY_CLIENT_SECRET=your_client_secret
```

## プロジェクト構造

```
vibefm/
├── src/
│   ├── app/
│   │   ├── api/recommend/       # レコメンドAPI
│   │   ├── globals.css          # グローバルスタイル
│   │   ├── layout.tsx           # ルートレイアウト
│   │   └── page.tsx             # メインページ
│   ├── components/
│   │   ├── LoadingAnimation.tsx # ローディングアニメーション
│   │   ├── MoodInput.tsx        # 気分入力コンポーネント
│   │   ├── RecommendationResults.tsx # 結果表示
│   │   └── TrackCard.tsx        # 楽曲カード
│   ├── lib/
│   │   ├── moodMapping.ts       # 気分マッピング
│   │   └── spotify.ts           # Spotify API
│   └── types/
│       └── spotify.ts           # 型定義
├── public/                      # 静的ファイル
├── Dockerfile                   # Docker設定
├── docker-compose.yml           # 開発環境設定
└── requirements.md              # 要件定義書
```

## API エンドポイント

### POST /api/recommend

気分に基づいて音楽をレコメンドします。

**リクエスト:**
```json
{
  "mood": "リラックス"
}
```

**レスポンス:**
```json
{
  "tracks": [/* Spotify track objects */],
  "mood": "リラックス",
  "searchQuery": "chill ambient relaxing music"
}
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 貢献

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## サポート

質問や問題がある場合は、GitHubのIssuesページでお知らせください。 