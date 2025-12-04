import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkDateOverlap } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { roomId, checkIn, checkOut } = await request.json();

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { available: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { available: false, message: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // Check for overlapping bookings
    const existingBookings = await prisma.booking.findMany({
      where: {
        roomId,
        status: {
          in: ['Pending', 'Confirmed'],
        },
      },
    });

    const hasOverlap = existingBookings.some((booking) => {
      return checkDateOverlap(
        checkInDate,
        checkOutDate,
        new Date(booking.checkIn),
        new Date(booking.checkOut)
      );
    });

    if (hasOverlap) {
      return NextResponse.json({
        available: false,
        message: 'Room is not available for the selected dates',
      });
    }

    return NextResponse.json({ available: true });
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { available: false, message: 'Error checking availability' },
      { status: 500 }
    );
  }
}



