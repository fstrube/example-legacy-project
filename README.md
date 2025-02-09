# Example Legacy Project

This project is the companion code for [franklinstrube.com/blog/inertia-vue-rollup](https://franklinstrube.com/blog/inertia-vue-rolloup).

## Prerequisites

* PHP 8.0
* Composer 2.x
* Node.js
* NPM 8.x

I'm running all commands inside an Alpine Linux v3.16 container. Install the pre-requisites with the following `apk` command:

```shell
apk add \
    composer \
    nodejs \
    npm \
    php8 \
    php8-dom \
    php8-fileinfo \
    php8-pdo \
    php8-pdo_sqlite \
    php8-session \
    php8-sqlite3 \
    php8-tokenizer \
    php8-xml \
    php8-xmlwriter
```

## Installation

```shell
composer install
npm install
npm run dev
cp .env.example .env
php artisan key:generate
```

Change `.env` to use SQLite

**.env**

```ini
DB_CONNECTION=sqlite
DB_HOST=
DB_PORT=
DB_DATABASE=database/database.sqlite
DB_USERNAME=
DB_PASSWORD=
```

Migrate the database and serve the app

```
php artisan migrate
php artisan serve
```

## License

The code is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
