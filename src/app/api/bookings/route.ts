import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkDateOverlap, calculateNights } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      roomId,
      name,
      email,
      phone,
      checkIn,
      checkOut,
      numberOfGuests,
      specialRequests,
    } = data;

    // Validate required fields
    if (!roomId || !name || !email || !phone || !checkIn || !checkOut || !numberOfGuests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Validate dates
    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // Check availability
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
      return NextResponse.json(
        { error: 'Room is not available for the selected dates' },
        { status: 400 }
      );
    }

    // Get room details
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }

    // Calculate total amount
    const nights = calculateNights(checkInDate, checkOutDate);
    const totalAmount = nights * room.pricePerNight;

    // Find or create customer
    let customer = await prisma.customer.findFirst({
      where: { email },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name,
          email,
          phone,
        },
      });
    } else {
      // Update customer info if needed
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          name,
          phone,
        },
      });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        customerId: customer.id,
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        numberOfGuests,
        totalAmount,
        status: 'Pending',
        specialRequests: specialRequests || null,
      },
      include: {
        room: true,
        customer: true,
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}


