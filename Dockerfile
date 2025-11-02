FROM php:8.3-fpm

# 必要な拡張をインストール
RUN apt-get update && apt-get install -y \
    git zip unzip libpq-dev \
    && docker-php-ext-install pdo_pgsql

WORKDIR /var/www/html
COPY . .

# composerインストール
RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer
