# Quick Setup Guide

## Step 1: Install Dependencies

Make sure you have Node.js 18+ installed, then run:

```bash
npm install
```

## Step 2: Set Up Environment Variables

Copy the example environment file:

```bash
# On Windows (PowerShell):
Copy-Item .env.example .env

# On Windows (CMD):
copy .env.example .env

# On Mac/Linux:
cp .env.example .env
```

Edit `.env` if you want to change the admin credentials.

## Step 3: Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database and tables
npx prisma db push

# Seed with sample data
npm run db:seed
```

## Step 4: Run Development Server

```bash
npm run dev
```

## Step 5: Access the Application

- **Public Site**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
  - Username: `admin`
  - Password: `admin123`

## Troubleshooting

If you encounter any errors:

1. **npm not found**: Make sure Node.js is installed and added to PATH
2. **Database errors**: Run `npx prisma generate` again
3. **Port already in use**: Change the port in package.json or use `npm run dev -- -p 3001`

## Next Steps

- Customize the resort name and content
- Replace placeholder images with your own
- Change admin credentials in production
- Set up email notifications (optional)

