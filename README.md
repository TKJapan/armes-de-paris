# 🏰 Armes de Paris  
**ファンタジー武器屋LP（Laravel + React + PostgreSQL + Docker）**

---

## 📘 プロジェクト概要
「Armes de Paris」は、React × TypeScript × Laravel × PostgreSQL を使った  
デモ用ランディングページ（LP）です。  
武器屋をモチーフに、  
Stripeテスト決済で購入体験ができるLPを構築します。

---

## 🧩 技術構成

| レイヤー | 技術 | 説明 |
|-----------|------|------|
| フロント | React + TypeScript | LPデザイン、武器ギャラリー、Stripeボタン |
| バックエンド | Laravel 11 | API構築、Stripe接続、DBアクセス |
| データベース | PostgreSQL 16 | 武器データを管理 |
| 開発環境 | Docker Compose | M1 Mac対応コンテナ構成 |

---

## ⚙️ セットアップ手順

### 1️⃣ プロジェクト作成
```bash
mkdir armes-de-paris
cd armes-de-paris
code .

2️⃣ Dockerファイル作成
📄 Dockerfile
FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git zip unzip libpq-dev \
    && docker-php-ext-install pdo_pgsql

WORKDIR /var/www/html
COPY . .

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer


📄 docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - .:/var/www/html
    depends_on:
      - db
    environment:
      DB_CONNECTION: pgsql
      DB_HOST: db
      DB_PORT: 5432
      DB_DATABASE: armes_de_paris
      DB_USERNAME: postgres
      DB_PASSWORD: secret

  db:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: armes_de_paris
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
    volumes:
      - ./postgres-data:/var/lib/postgresql/data


3️⃣ コンテナ起動
docker-compose up -d

4️⃣ Laravelインストール
docker exec -it armes-de-paris-app-1 bash
composer create-project laravel/laravel laravel

6️⃣ キャッシュクリア＆マイグレーション
php artisan config:clear
php artisan cache:clear
php artisan migrate:fresh

📂 フォルダ構成（進行形）
armes-de-paris/
├── docker-compose.yml
├── Dockerfile
├── postgres-data/
└── laravel/
    ├── app/
    ├── database/
    │   ├── migrations/
    │   └── seeders/
    ├── public/
    └── .env
