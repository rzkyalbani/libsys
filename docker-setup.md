# Docker Setup with Laravel Sail

This document provides instructions for setting up and using Docker with Laravel Sail for the LibSys project.

## Prerequisites

Before getting started, ensure you have the following installed on your system:

- Docker Engine (version 20.10 or higher)
- Docker Compose (v2.0 or higher)
- Composer
- PHP 8.4 or higher (for local CLI commands)

## Getting Started

Laravel Sail provides a Docker-based development environment for Laravel applications. The LibSys project uses Laravel Sail with the following services:

- **Laravel Application**: Running on PHP 8.4
- **MySQL Database**: MySQL 8.0 server
- **PhpMyAdmin**: Database management interface
- **Nginx Web Server**: For serving the application

## Configuration

The Docker configuration is defined in the `compose.yaml` file. The key services configured are:

### Laravel Application (`laravel.test`)
- PHP version: 8.4
- Default port: 80 (mapped to your chosen `APP_PORT` from `.env`)
- Vite port: 5173 (for development)
- Volume mapping: Project directory to `/var/www/html`
- Environment variables for Laravel and Xdebug

### MySQL Database (`mysql`)
- MySQL version: 8.0
- Default port: 3306 (mapped to `FORWARD_DB_PORT` from `.env`)
- Database name, username, and password configured via `.env`
- Persistent volume: `sail-mysql`

### PhpMyAdmin (`phpmyadmin`)
- Web-based database management tool
- Accessible at `http://localhost:8080`
- Connected to the MySQL service

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/rzkyalbani/libsys.git
cd libsys
```

### 2. Install Dependencies
```bash
composer install
npm install
```

### 3. Configure Environment
Copy the example environment file and adjust the settings as needed:

```bash
cp .env.example .env
```

Key environment variables for Docker:
- `APP_PORT`: The port where the application will be accessible (default: 80)
- `DB_PORT`: The port for MySQL (default: 3306)
- `FORWARD_DB_PORT`: The forwarded port for MySQL (default: 3306)
- `VITE_PORT`: The port for Vite dev server (default: 5173)

### 4. Generate App Key
```bash
php artisan key:generate
```

## Running the Application with Sail

### Start the Services
```bash
./vendor/bin/sail up
```

This will start all services defined in `compose.yaml`. The first time you run this command, Docker images will be built.

### Start Services in Background
```bash
./vendor/bin/sail up -d
```

### Access the Application
Once the services are running:
- Application: `http://localhost` (or the port specified in `APP_PORT`)
- PhpMyAdmin: `http://localhost:8080`

## Common Sail Commands

### Execute Artisan Commands
```bash
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan migrate:fresh --seed
./vendor/bin/sail artisan db:seed
./vendor/bin/sail artisan tinker
```

### Execute Composer Commands
```bash
./vendor/bin/sail composer install
./vendor/bin/sail composer update
```

### Execute NPM Commands
```bash
./vendor/bin/sail npm run build
./vendor/bin/sail npm run dev
```

### Execute Shell Commands
```bash
./vendor/bin/sail shell
```
This opens a shell inside the Laravel application container.

### Stop Services
```bash
./vendor/bin/sail down
```

### View Logs
```bash
./vendor/bin/sail logs
```

## Database Configuration

The application is configured to use MySQL with the following default settings:
- Host: `mysql` (Docker service name)
- Port: 3306
- Database: `libsys` (or as defined in `.env`)
- Username: `root` (or as defined in `.env`)
- Password: As defined in `.env`

When using PhpMyAdmin, connect using:
- Server: `mysql`
- Username: As defined in `.env` (default: `root`)
- Password: As defined in `.env`

## Development with Sail

### Running Migrations
```bash
./vendor/bin/sail artisan migrate
# Or with seeders
./vendor/bin/sail artisan migrate:fresh --seed
```

### Running Tests
```bash
./vendor/bin/sail artisan test
# Or with Pest
./vendor/bin/sail php vendor/bin/pest
```

### Working with Frontend Assets
```bash
# Development (hot reloading)
./vendor/bin/sail npm run dev

# Production build
./vendor/bin/sail npm run build
```

## XDebug Configuration

XDebug is configured in the Docker environment. The default settings are:
- XDebug mode: `off` (can be changed with `SAIL_XDEBUG_MODE`)
- Client host: `host.docker.internal`

To enable XDebug, change the environment variable:
```bash
# In .env file
SAIL_XDEBUG_MODE=debug
SAIL_XDEBUG_CONFIG="client_host=host.docker.internal client_port=9003"
```

## Troubleshooting

### Port Already in Use
If you encounter port conflicts, update the appropriate port variables in your `.env` file:
- `APP_PORT` for the application
- `FORWARD_DB_PORT` for MySQL
- `VITE_PORT` for Vite

### Docker Build Issues
If Docker images fail to build:
1. Clear Docker cache: `docker system prune -a`
2. Remove volumes if needed: `docker volume prune`
3. Rebuild: `./vendor/bin/sail build --no-cache`

### Permission Issues
If you encounter file permission issues, ensure your `WWWUSER` and `WWWGROUP` variables in `.env` match your local user ID:
```bash
# Find your user ID
id -u
id -g
```

Then set these in your `.env`:
```
WWWUSER=1000
WWWGROUP=1000
```

### Network Issues
If the application container can't communicate with the database, ensure all services are running:
```bash
./vendor/bin/sail ps
```

## Stopping and Cleaning Up

To stop all services:
```bash
./vendor/bin/sail down
```

To stop and remove volumes (this will delete your database data):
```bash
./vendor/bin/sail down -v
```

To clean up unused Docker resources:
```bash
docker system prune
```