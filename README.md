# mimiru_api

NestJSで構築されたラジオサイトのバックエンドアプリケーション

## 必要要件

- Node.js v20.10.0以上
- npm 10.2.3以上
- Visual Studio Code (推奨)
- Docker および Docker Compose
- PostgreSQL 14（ローカル環境の場合）

## セットアップ

### 1. Visual Studio Codeの設定

1. VSCodeを起動する
2. `Cmd + Shift + P` を押下し、コマンドパレットを表示
3. 検索バーに "recommended" と入力
4. "Show Recommended Extensions" をクリック
5. "WORKSPACE RECOMMENDATIONS" に記載されている拡張機能をインストール

### 2. 環境変数の設定

`.env`ファイルをプロジェクトルートに作成し、以下の内容を設定：

```env
# 開発環境用の設定
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/radio_site?schema=public"
JWT_SECRET="your-secret-key"

# テスト環境用の設定（必要な場合）
TEST_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/radio_site_test?schema=public"
```

## アプリケーションの起動方法

### 開発環境での起動手順

1. データベースの起動

```bash
docker compose up -d
```

2. 依存パッケージのインストール（初回、またはパッケージ追加時）

```bash
npm install
```

3. データベースマイグレーションの実行

```bash
npx prisma migrate deploy
```

4. アプリケーションの起動

```bash
npm run start
```


6. データベースの停止

```bash
docker compose down
```

## 開発時の注意点

### データベースマイグレーション

1. スキーマの変更
   - `prisma/schema.prisma`を編集

2. マイグレーションファイルの生成
```bash
npx prisma migrate dev --name [変更の説明]
```

3. マイグレーションの適用
```bash
npx prisma migrate deploy
```

### APIドキュメント

Swaggerドキュメントは以下のURLで確認できます：
```
http://localhost:3000/api
```