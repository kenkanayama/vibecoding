# VibeFM 開発・デプロイ事前準備チェックリスト

---

## 1. Google Cloud Platform（GCP）/ Cloud Run準備

- [ ] GCPプロジェクトを作成
- [ ] 課金の有効化
- [ ] Cloud Run APIの有効化
- [ ] Container Registry or Artifact Registryの有効化
- [ ] サービスアカウントの作成（Cloud Run管理者、Storage管理者、Cloud Build編集者権限）
- [ ] サービスアカウントキー（JSON）の発行・ダウンロード
- [ ] GCP CLI（gcloud）のインストール＆初期化
- [ ] Dockerのインストール

---

## 2. Spotify API（Spotify for Developers）準備

- [ ] Spotify Developerアカウント作成
- [ ] 新規アプリ登録
- [ ] Client ID / Client Secretの取得
- [ ] Redirect URIの登録（ローカル・本番両方）
- [ ] 必要なスコープの確認

---

## 3. 環境変数の準備

- [ ] `.env`ファイル作成・必要な値を記載
- [ ] 本番環境用にはCloud Runの「環境変数」設定画面で同様の値をセット

---

## 4. GitHubリポジトリ・CI/CD

- [ ] GitHubリポジトリの作成（済み）
- [ ] mainブランチ運用の徹底
- [ ] GitHub ActionsでCloud Run自動デプロイを行う場合は、GCPサービスアカウントのシークレット登録

---

## 5. その他

- [ ] 必要に応じてGoogle Cloud StorageやSecret Managerの有効化
- [ ] ドメイン設定（独自ドメインを使う場合）

---

このチェックリストをすべて完了したら、開発・デプロイ作業にスムーズに進めます。 