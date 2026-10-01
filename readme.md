# Company Website

A company website built with **Laravel + Inertia + React**. It has a public home page and a login-protected dashboard where you can edit the home page content.

---

## Tech Stack

| Part | Technology |
| --- | --- |
| Backend | Laravel 13 (PHP 8.3+) |
| Frontend | React 19 + TypeScript |
| Bridge (backend ↔ frontend) | Inertia.js 3 |
| Styling | Tailwind CSS 4 |
| UI components | Radix UI + shadcn-style components (`resources/js/components/ui`), Lucide icons, Sonner toasts |
| Build tool | Vite (via Vite+) with React Compiler |
| Authentication | Laravel Fortify (login, register, password reset) |
| Typed routes | Laravel Wayfinder (Laravel routes become TypeScript functions) |
| Database | SQLite (default, no setup needed) |
| Testing | Pest |
| Code quality | Laravel Pint (PHP style), PHPStan / Larastan (PHP types), `vp check` + `tsc` (frontend) |
| Dev tools | Laravel Boost, Laravel Pail (logs), Laravel Sail (Docker, optional) |

---

## Requirements

Install these first:

- **PHP 8.3 or higher** (with the `sqlite3` / `pdo_sqlite` extension enabled)
- **Composer** 2
- **Node.js 22** and **npm**
- **Git**

Check your versions:

```bash
php -v
composer -V
node -v
npm -v
```

---

## First-Time Installation

```bash
# 1. Go into the project folder
cd company_website

# 2. Run the setup script
composer setup
```

`composer setup` does everything for you:

1. `composer install` (PHP packages)
2. Copies `.env.example` to `.env` (if `.env` does not exist)
3. `php artisan key:generate` (app key)
4. `php artisan migrate --force` (creates database tables)
5. `npm install` (JS packages)
6. `npm run build` (builds the frontend)

> If SQLite complains that the database file is missing, create it and migrate again:
>
> ```bash
> touch database/database.sqlite      # Windows (PowerShell): New-Item database/database.sqlite
> php artisan migrate
> ```

### Add starter data (important)

The home page reads its title from the database. Seed it once:

```bash
php artisan db:seed
```

This creates a test user (`test@example.com`) and the home page title. You can also just register a new account at `/register`.

---

## Run the Project

```bash
composer dev
```

Then open **http://localhost:8001**

If `composer dev` does not work on your machine, run these in two separate terminals:

```bash
php artisan serve     # terminal 1: Laravel backend
npm run dev           # terminal 2: Vite frontend
```

---

## Pages

| URL | What it is |
| --- | --- |
| `/` | Public home page (Blade view) |
| `/register`, `/login` | Create account / sign in |
| `/dashboard` | Dashboard (login required) |
| `/dashboard/home-page` | Edit the home page title (login required) |
| `/settings/profile`, `/settings/security`, `/settings/appearance` | Account settings |

---

## Useful Commands

```bash
npm run build            # Build frontend for production
npm run check            # Lint / format check (frontend)
npm run check:fix        # Auto-fix frontend issues
npm run types:check      # TypeScript check

composer lint            # Auto-fix PHP code style (Pint)
composer types:check     # PHP static analysis (PHPStan)
composer test            # Lint + type check + run all tests
composer ci:check        # Everything CI runs

php artisan migrate:fresh --seed   # Reset the database with fresh seed data
```

---

## Project Structure

```
app/Http/Controllers/    Laravel controllers
app/Models/              Eloquent models (User, HomePage)
database/migrations/     Database tables
database/seeders/        Starter data
resources/views/         Blade views (public home page)
resources/js/pages/      React pages (Inertia)
resources/js/components/ Reusable React components
resources/js/layouts/    Page layouts
resources/css/app.css    Tailwind entry file
routes/web.php           Main routes
routes/settings.php      Settings routes
tests/                   Pest tests
```

---

## Troubleshooting

- **Blank page or "Vite manifest not found":** run `npm run build`, or keep `npm run dev` running.
- **"No application encryption key":** run `php artisan key:generate`.
- **"no such table":** run `php artisan migrate`.
- **Home page shows an error or empty title:** run `php artisan db:seed`.
- **Changed `.env` but nothing happened:** run `php artisan config:clear`.
- **Port 8001 already in use:** change `SERVER_PORT` and `APP_URL` in `.env` to the port you want to use.

---

## Notes

- Never commit your `.env` file. Use `.env.example` as the template.
- The default database is SQLite (`database/database.sqlite`). To use MySQL or PostgreSQL, change the `DB_*` values in `.env`.
- `node_modules` and `vendor` are generated folders. Do not upload or share them; others get them by running `composer setup`.
