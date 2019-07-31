![WordPress + React Starter Kit](frontend/static/images/wordpress-plus-react-header.png)

[![Build status](https://travis-ci.org/postlight/headless-wp-starter.svg)](https://travis-ci.org/postlight/headless-wp-starter)

[Postlight](https://postlight.com)'s Headless WordPress + React Starter Kit is an automated toolset that will spin up two things:

1.  A WordPress backend that serves its data via the [WP REST API](https://developer.wordpress.org/rest-api/).
2.  Another sample server-side rendered React frontend using [Next.js](https://github.com/zeit/next.js/) powered by the WP REST API.

You can read all about it in [this handy introduction](https://postlight.com/trackchanges/introducing-postlights-wordpress-react-starter-kit).

**What's inside:**

- An automated installer which bootstraps a core WordPress installation that provides an established, stable REST API.
- The WordPress plugins you need to set up custom post types and custom fields ([Advanced Custom Fields](https://www.advancedcustomfields.com/) and [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/)).
- Plugins which expose those custom fields and WordPress menus in the [WP REST API](https://developer.wordpress.org/rest-api/) ([ACF to WP API](https://wordpress.org/plugins/acf-to-wp-api/) and [WP-REST-API V2 Menus](https://wordpress.org/plugins/wp-rest-api-v2-menus/)).
- JWT authentication plugin: [JWT WP REST](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/).
- All the starter WordPress theme code and settings headless requires, including pretty permalinks, CORS `Allow-Origin` headers, and useful logging functions for easy debugging.
- A sample, starter frontend React app, server-side rendered via [Next.js](https://learnnextjs.com/), powered by the WP REST API.
- [Docker](https://www.docker.com/) containers and scripts to manage them, for easily running the frontend React apps and backend locally or deploying it to any hosting provider with Docker support.

Let's get started.

## Install

_Prerequisite:_ Before you begin, you need [Docker](https://www.docker.com) installed. On Linux, you might need to install [docker-compose](https://docs.docker.com/compose/install/#install-compose) separately.

Docker Compose builds and starts four containers by default: `db-headless`, `wp-headless` & `frontend`:

    docker-compose up -d

**Wait a few minutes** for Docker to build the services for the first time. After the initial build, startup should only take a few seconds.

You can follow the Docker output to see build progress and logs:

    docker-compose logs -f

Alternatively, you can use some useful Docker tools like Kitematic and/or VSCode Docker plugin to follow logs, start / stop / remove containers and images.

_Optional:_ you can run the frontend locally while WordPress still runs on Docker:

    docker-compose up -d wp-headless
    cd frontend && yarn && yarn start

Once the containers are running, you can visit the React frontends and backend WordPress admin in your browser.

## Frontend

This starter kit provides a frontend container:

- `frontend` container powered by the WP REST API is server-side rendered using Next.js, and exposed on port `3000`: [http://localhost:3000](http://localhost:3000)

Here's what the frontend looks like:

![Frontend Screencast](/wordpress-react-starter-kit-fe.gif)

You can follow the `yarn start` output by running docker-compose `logs` command followed by the container name. For example:

    docker-compose logs -f frontend

If you need to restart that process, restart the container:

    docker-compose restart frontend

**PS:** Browsing the Next.js frontend in development mode is relatively slow due to the fact that pages are being built on demand. In a production environment, there would be a significant improvement in page load.

## Backend

The `wp-headless` container exposes Apache on host port `8080`:

- Dashboard: [http://localhost:8080/wp-admin](http://localhost:8080/wp-admin) (default credentials `nedstark`/`winteriscoming`)
- REST API: [http://localhost:8080/wp-json](http://localhost:8080/wp-json)

This container includes some development tools:

    bin/composer.sh --help
    bin/phpcbf --help
    bin/ phpcs --help
    bin/phpunit --help
    bin/wp.sh --info

Apache/PHP logs are available via `docker-compose logs -f wp-headless`.

## Database

The `db-headless` container exposes MySQL on host port `3307`:

    mysql -uwp_headless -pwp_headless -h127.0.0.1 -P3307 wp_headless

You can also run a mysql shell on the container:

    docker exec db-headless mysql -hdb-headless -uwp_headless -pwp_headless wp_headless

## Reinstall/Import

To reinstall WordPress from scratch, run:

    docker exec wp-headless wp db reset --yes && docker exec wp-headless install_wordpress

To import data from a mysqldump with `mysql`, run:

    docker exec db-headless mysql -hdb-headless -uwp_headless -pwp_headless wp_headless < example.sql
    docker exec wp-headless wp search-replace https://example.com http://localhost:8080

## Extend the REST API

At this point you can start setting up custom fields in the WordPress admin, and if necessary, creating [custom REST API endpoints](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/) in the Postlight Headless WordPress Starter theme.

The primary theme code is located in `wordpress/wp-content/themes/postlight-headless-wp`.

## REST JWT Authentication

To give WordPress users the ability to sign in via the frontend app, use something like the [WordPress Salt generator](https://api.wordpress.org/secret-key/1.1/salt/) to generate a secret for JWT, then define it in `wp-config.php`

For the REST API:

    define('JWT_AUTH_SECRET_KEY', 'your-secret-here');

Make sure to read the [JWT REST](https://github.com/Tmeister/wp-api-jwt-auth) documentation for more info.

## Linting

Remember to lint your code as you go.

To lint WordPress theme modifications, you can use [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) like this:

    docker exec -w /var/www/html/wp-content/themes/postlight-headless-wp wp-headless phpcs

You may also attempt to autofix PHPCS errors:

    docker exec -w /var/www/html/wp-content/themes/postlight-headless-wp wp-headless phpcbf

To lint and format the JavaScript apps, both [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) configuration files are included.

## Hosting

Most WordPress hosts don't also host Node applications, so when it's time to go live, you will need to find a hosting service for the frontend.

That's why we've packaged the frontend app in a Docker container, which can be deployed to a hosting provider with Docker support like Amazon Web Services or Google Cloud Platform. For a fast, easier alternative, check out [Now](https://zeit.co/now).

## Troubleshooting Common Errors

**Breaking Change Alert - Docker**

If you had the project already setup and then updated to a commit newer than `99b4d7b`, you will need to go through the installation process again because the project was migrated to Docker.
You will need to also migrate MySQL data to the new MySQL db container.

**Docker Caching**

In some cases, you need to delete the `wp-headless` image (not only the container) and rebuild it.

**CORS errors**

If you have deployed your WordPress install and are having CORS issues be sure to update `/wordpress/wp-content/themes/postlight-headless-wp/inc/frontend-origin.php` with your frontend origin URL.

See anything else you'd like to add here? Please send a pull request!

---

🔬 A Labs project from your friends at [Postlight](https://postlight.com). Happy coding!
