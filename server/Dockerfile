# ベースイメージ
FROM php:8.2.12-fpm

# 作業ディレクトリを設定
WORKDIR /var/www

# 必要なパッケージをインストールする
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libonig-dev \
    libpng-dev \
    libxml2-dev \
    curl \
    npm \
    && docker-php-ext-install pdo_mysql zip mbstring exif pcntl bcmath gd

# Composerをインストールする
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# コンテナ内にアプリケーションをコピーする
COPY . /var/www/html 

# アプリケーションのディレクトリに移動する
WORKDIR /var/www/html

# Composerで依存関係をインストールする
RUN composer install --no-dev --optimize-autoloader

# .envファイルをコピーする（必要に応じて変更してください）
COPY .env.example /var/www/html/.env



RUN php artisan migrate

# アプリケーションキーを生成する
RUN php artisan key:generate

# ポートを公開する
EXPOSE 8000

# コンテナの起動時にPHPサーバーを起動する
CMD php artisan serve --host=0.0.0.0 --port=8000
