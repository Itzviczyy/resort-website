import { prisma } from '@/lib/prisma';
import { StatsCard } from '@/components/admin/StatsCard';
import { BookingsChart } from '@/components/admin/BookingsChart';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { RecentBookingsTable } from '@/components/admin/RecentBookingsTable';
import { formatCurrency } from '@/lib/utils';

async function getDashboardData() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Total bookings
  const totalBookings = await prisma.booking.count();

  // Bookings this month
  const bookingsThisMonth = await prisma.booking.count({
    where: {
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

  // Total revenue
  const totalRevenueResult = await prisma.booking.aggregate({
    where: {
      status: {
        in: ['Confirmed'],
      },
    },
    _sum: {
      totalAmount: true,
    },
  });
  const totalRevenue = totalRevenueResult._sum.totalAmount || 0;

  // Revenue this month
  const revenueThisMonthResult = await prisma.booking.aggregate({
    where: {
      status: {
        in: ['Confirmed'],
      },
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    _sum: {
      totalAmount: true,
    },
  });
  const revenueThisMonth = revenueThisMonthResult._sum.totalAmount || 0;

  // Bookings per month (last 12 months)
  const bookingsPerMonth = [];
  for (let i = 11; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const count = await prisma.booking.count({
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
    });
    bookingsPerMonth.push({
      month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      bookings: count,
    });
  }

  // Revenue per month (last 12 months)
  const revenuePerMonth = [];
  for (let i = 11; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const revenueResult = await prisma.booking.aggregate({
      where: {
        status: {
          in: ['Confirmed'],
        },
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
      _sum: {
        totalAmount: true,
      },
    });
    revenuePerMonth.push({
      month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      revenue: revenueResult._sum.totalAmount || 0,
    });
  }

  // Recent bookings
  const recentBookings = await prisma.booking.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      room: true,
      customer: true,
    },
  });

  return {
    totalBookings,
    bookingsThisMonth,
    totalRevenue,
    revenueThisMonth,
    bookingsPerMonth,
    revenuePerMonth,
    recentBookings,
  };
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your resort bookings and revenue
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Bookings"
          value={data.totalBookings.toString()}
          description="All time"
        />
        <StatsCard
          title="Bookings This Month"
          value={data.bookingsThisMonth.toString()}
          description="Current month"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(data.totalRevenue)}
          description="All time"
        />
        <StatsCard
          title="Revenue This Month"
          value={formatCurrency(data.revenueThisMonth)}
          description="Current month"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        <BookingsChart data={data.bookingsPerMonth} />
        <RevenueChart data={data.revenuePerMonth} />
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Recent Bookings</h2>
        <RecentBookingsTable bookings={data.recentBookings} />
      </div>
    </div>
  );
}



