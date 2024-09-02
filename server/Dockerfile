# ビルドステージ
FROM php:8.2.12-fpm AS builder

# 作業ディレクトリを設定
WORKDIR /var/www/html

# 必要なパッケージをインストールする
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libonig-dev \
    libpng-dev \
    libxml2-dev \
    curl \
    && docker-php-ext-install pdo_mysql zip mbstring exif pcntl bcmath gd opcache

# Composerをインストールする
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# composer.jsonとcomposer.lockをコピーして、依存関係をインストール
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# アプリケーションのソースコードと.envファイルをコピー
COPY . .

# .envファイルを設定し、アプリケーションキーを生成
RUN cp .env.example .env \
    && php artisan key:generate

# 権限の設定（ストレージとキャッシュ）
RUN chown -R www-data:www-data storage bootstrap/cache

# 本番ステージ
FROM php:8.2.12-fpm

WORKDIR /var/www/html

# 必要な PHP 拡張をインストール
RUN docker-php-ext-install pdo_mysql opcache

# ビルドステージからファイルをコピー
COPY --from=builder /var/www/html .

# PHP の設定を最適化
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# OPcache の設定
RUN echo 'opcache.memory_consumption=128' >> /usr/local/etc/php/conf.d/opcache-recommended.ini \
    && echo 'opcache.interned_strings_buffer=8' >> /usr/local/etc/php/conf.d/opcache-recommended.ini \
    && echo 'opcache.max_accelerated_files=4000' >> /usr/local/etc/php/conf.d/opcache-recommended.ini \
    && echo 'opcache.revalidate_freq=2' >> /usr/local/etc/php/conf.d/opcache-recommended.ini \
    && echo 'opcache.fast_shutdown=1' >> /usr/local/etc/php/conf.d/opcache-recommended.ini

# 権限の設定
RUN chown -R www-data:www-data storage bootstrap/cache vendor

# ポートを公開する
EXPOSE 8000

# コンテナの起動時にPHPサーバーを起動する
CMD php artisan serve --host=0.0.0.0 --port=8000
