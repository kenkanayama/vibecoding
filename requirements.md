# VibeFM 要件定義書

## 1. プロジェクト概要
VibeFMは、ユーザーの気分や感情に基づいて音楽をレコメンドするWebサービスです。ユーザーが入力した感情や状況に合わせて、Spotifyの曲やプレイリストを提案します。

## 2. 主要機能

### 2.1 ユーザー入力機能
- テキスト入力フィールドで気分や状況を入力

### 2.2 レコメンド機能
- ユーザー入力から3秒以内に結果を表示
- 固定マッピングによる即時レスポンス（例：雨→Lo-Fi雨音、リラックス→アンビエント等）

### 2.3 表示機能
- レコメンドされた曲/プレイリストの表示（アルバムアート・曲名・アーティスト名）
- 30秒プレビュー再生（Spotify Web Playback SDK）

## 3. 技術要件

### 3.1 フロントエンド
- Next.js 14（App Router）
- TypeScript
- Tailwind CSS
- Spotify Web Playback SDK
- Docker対応

### 3.2 バックエンド
- Next.js API Routes
- Spotify Web API
- Docker対応

### 3.3 インフラ
- Docker Compose（開発環境）
- Google Cloud Run（本番環境）

## 4. 非機能要件

### 4.1 パフォーマンス
- ページロード：2秒以内
- レコメンド表示：3秒以内
- モバイル対応

### 4.2 セキュリティ
- Spotify認証の安全な実装
- 環境変数で機密情報管理

### 4.3 ユーザビリティ
- 直感的なUI/UX
- エラー時のフィードバック
- ローディング表示

## 5. 開発フロー
- 機能ごとにfeatureブランチ作成
- プルリクエストベースでmainへマージ
- mainブランチが本番環境用

## 6. 本番環境
- Cloud Runへデプロイ
- Dockerイメージで動作 