import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generatePDFReport } from '@/lib/pdf-generator';
import { formatDate } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const { month, year } = await request.json();

    if (!month || !year) {
      return NextResponse.json(
        { error: 'Month and year are required' },
        { status: 400 }
      );
    }

    const monthIndex = parseInt(month) - 1;
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59);

    // Get bookings for the month
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

    // Calculate totals
    const totalBookings = bookings.length;
    const totalRevenue = bookings
      .filter((b) => b.status === 'Confirmed')
      .reduce((sum, b) => sum + b.totalAmount, 0);

    // Find most booked room
    const roomCounts: Record<string, number> = {};
    bookings.forEach((booking) => {
      roomCounts[booking.room.name] = (roomCounts[booking.room.name] || 0) + 1;
    });
    const mostBookedRoom =
      Object.entries(roomCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    // Prepare report data
    const reportData = {
      month: startDate.toLocaleDateString('en-US', { month: 'long' }),
      year: year,
      totalBookings,
      totalRevenue,
      mostBookedRoom,
      bookings: bookings.map((booking) => ({
        id: booking.id,
        customerName: booking.customer.name,
        roomName: booking.room.name,
        checkIn: formatDate(booking.checkIn),
        checkOut: formatDate(booking.checkOut),
        amount: booking.totalAmount,
      })),
    };

    // Generate PDF
    const pdfBytes = generatePDFReport(reportData);

    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report-${month}-${year}.pdf"`,
      },
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}


