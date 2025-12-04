# Vagamon Misty Heights Resort - Booking Application

A complete, production-ready resort booking web application for a hill-station resort located in Vagamon, Kerala. Built with Next.js 15, TypeScript, Prisma, and Tailwind CSS.

## Features

### Public Features
- **Home Page**: Hero section, quick booking widget, featured rooms, gallery preview, amenities, testimonials
- **Rooms Listing**: Browse all available rooms with filtering options
- **Room Details**: Detailed room information with image gallery and booking widget
- **Gallery**: Photo gallery with category filters and lightbox view
- **Things to Do**: Information about Vagamon activities and attractions
- **Booking System**: Complete booking flow with availability checking and confirmation

### Admin Features
- **Dashboard**: Overview with metrics, charts, and recent bookings
- **Rooms Management**: Full CRUD operations for room types
- **Customers Management**: View and manage customer information
- **Bookings Management**: View, edit, and manage all bookings
- **Monthly Reports**: Generate detailed monthly reports with PDF export

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (compatible with MySQL/PostgreSQL)
- **ORM**: Prisma
- **UI Components**: ShadCN UI
- **Animations**: Framer Motion
- **Charts**: Recharts
- **PDF Generation**: jsPDF
- **Authentication**: Custom session-based auth

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Basic knowledge of Next.js and TypeScript

## Installation

1. **Clone or extract the project** to your desired location

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update the following:
   ```
   DATABASE_URL="file:./dev.db"
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

4. **Set up the database**:
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Push the schema to the database
   npx prisma db push
   
   # Seed the database with sample data
   npm run db:seed
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Database Management

### View Database (Prisma Studio)

```bash
npm run db:studio
```

This opens a visual database browser at [http://localhost:5555](http://localhost:5555)

### Reset Database

To reset the database and reseed:

```bash
# Delete the database file (if using SQLite)
rm prisma/dev.db

# Push schema again
npx prisma db push

# Reseed
npm run db:seed
```

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

**Important**: Change these credentials in production!

## Project Structure

```
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── (public)/      # Public pages
│   │   ├── admin/         # Admin pages (protected)
│   │   └── api/           # API routes
│   ├── components/        # React components
│   │   ├── ui/            # ShadCN UI components
│   │   ├── layout/        # Layout components
│   │   ├── forms/         # Form components
│   │   ├── rooms/         # Room-related components
│   │   ├── gallery/       # Gallery components
│   │   └── admin/         # Admin components
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript types
└── public/                # Static assets
```

## Key Features Explained

### Booking System
- Real-time availability checking
- Prevents double-booking
- Automatic total calculation (nights × price)
- Email confirmation (ready for integration)

### Admin Dashboard
- Real-time metrics and statistics
- Interactive charts (bookings and revenue)
- Recent bookings table
- Quick access to all management sections

### Monthly Reports
- Select any month and year
- View total bookings and revenue
- Identify most booked room
- Daily bookings chart
- Download PDF report

## Customization

### Changing Resort Name
Search and replace "Vagamon Misty Heights Resort" throughout the codebase.

### Adding New Room Types
1. Go to Admin → Rooms
2. Click "Add New Room"
3. Fill in the details and save

### Modifying Amenities
Edit the amenities list in the room form or update the seed script.

### Changing Colors/Theme
Edit `src/app/globals.css` and `tailwind.config.ts` to customize the color scheme.

## Troubleshooting

### Database Connection Issues
- Ensure `DATABASE_URL` in `.env` is correct
- Run `npx prisma generate` after schema changes
- Check that the database file exists (for SQLite)

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Regenerate Prisma Client: `npx prisma generate`

### Authentication Issues
- Clear browser cookies
- Check that admin user exists in database
- Verify password hashing is working

## Production Deployment

1. **Update environment variables** for production
2. **Change admin credentials** immediately
3. **Use a production database** (PostgreSQL/MySQL recommended)
4. **Set up proper error logging** and monitoring
5. **Configure HTTPS** for secure connections
6. **Set up email service** for booking confirmations (optional)

## Database Migration (SQLite to PostgreSQL/MySQL)

1. Update `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/resort_db"
   ```

2. Update `provider` in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // or "mysql"
     url      = env("DATABASE_URL")
   }
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Seed the database:
   ```bash
   npm run db:seed
   ```

## License

This project is provided as-is for educational and commercial use.

## Support

For issues or questions, please check the code comments or refer to the Next.js and Prisma documentation.

---

**Built with ❤️ for Vagamon Misty Heights Resort**



