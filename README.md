🏰 Armes de Paris

ファンタジー武器屋LP（Laravel + React + PostgreSQL + Docker）

📘 プロジェクト概要

「Armes de Paris」は React × TypeScript × Laravel × PostgreSQL を使った
デモ用ランディングページ（LP）です。

🧩 技術構成
レイヤー	技術	説明
フロント	React + TypeScript (Vite)	LPデザイン、武器ギャラリー、決済ボタン
API	Laravel 11	武器データ API、Stripe連携
データベース	PostgreSQL 16	武器データを管理
インフラ	Docker Compose	M1/M2 Mac 対応コンテナ構成
⚙️ セットアップ手順
1️⃣ プロジェクト作成
mkdir armes-de-paris
cd armes-de-paris
code .

2️⃣ Dockerfile 作成

📄 Dockerfile

FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git zip unzip libpq-dev \
    && docker-php-ext-install pdo_pgsql

WORKDIR /var/www/html
COPY . .

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

3️⃣ docker-compose.yml 作成

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

  frontend:
    image: node:20
    working_dir: /app
    volumes:
      - ./weapons-front:/app
    ports:
      - "5173:5173"
    command: ["npm", "run", "dev", "--", "--host"]
    depends_on:
      - app

4️⃣ コンテナ起動
docker-compose up -d

5️⃣ Laravel インストール（初回のみ）
docker exec -it armes-de-paris-app-1 bash
composer create-project laravel/laravel laravel

6️⃣ マイグレーション実行
php artisan config:clear
php artisan cache:clear
php artisan migrate:fresh

📂 プロジェクト構成（途中）
armes-de-paris/
├── docker-compose.yml
├── Dockerfile
├── postgres-data/
├── laravel/
└── weapons-front/

🎨 フロントエンド（React）の実行方法
🔵 推奨：ローカル実行（最速）
cd weapons-front
npm install
npm run dev


👉 http://localhost:5173

🔵 任意：Docker で React を起動

初回：

docker-compose run --rm frontend npm install


起動：

docker-compose up frontend

🔗 Laravel API

React から武器データを取得：

fetch("http://localhost:8000/api/weapons");

再実行
open -a Docker 
docker compose up -d

