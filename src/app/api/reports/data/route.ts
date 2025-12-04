import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const month = parseInt(searchParams.get('month') || '1');
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());

    const monthIndex = month - 1;
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59);

    const bookings = await prisma.booking.findMany({
      where: {
        checkIn: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        room: true,
        customer: true,
      },
      orderBy: {
        checkIn: 'asc',
      },
    });

    const totalBookings = bookings.length;
    const totalRevenue = bookings
      .filter((b) => b.status === 'Confirmed')
      .reduce((sum, b) => sum + b.totalAmount, 0);

    const roomCounts: Record<string, number> = {};
    bookings.forEach((booking) => {
      roomCounts[booking.room.name] = (roomCounts[booking.room.name] || 0) + 1;
    });
    const mostBookedRoom =
      Object.entries(roomCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const dailyBookings: Record<number, number> = {};
    bookings.forEach((booking) => {
      const day = new Date(booking.checkIn).getDate();
      dailyBookings[day] = (dailyBookings[day] || 0) + 1;
    });
    const dailyData = Array.from({ length: endDate.getDate() }, (_, i) => ({
      day: i + 1,
      bookings: dailyBookings[i + 1] || 0,
    }));

    return NextResponse.json({
      totalBookings,
      totalRevenue,
      mostBookedRoom,
      bookings: bookings.map((b) => ({
        id: b.id,
        customerName: b.customer.name,
        roomName: b.room.name,
        checkIn: formatDate(b.checkIn),
        checkOut: formatDate(b.checkOut),
        amount: b.totalAmount,
        status: b.status,
      })),
      dailyData,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Report data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report data' },
      { status: 500 }
    );
  }
}


