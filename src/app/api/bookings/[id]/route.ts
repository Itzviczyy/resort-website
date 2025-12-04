import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculateNights } from '@/lib/utils';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    const data = await request.json();
    const {
      checkIn,
      checkOut,
      numberOfGuests,
      status,
      customerName,
      customerPhone,
    } = data;

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { room: true, customer: true },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Update customer info
    await prisma.customer.update({
      where: { id: booking.customerId },
      data: {
        name: customerName,
        phone: customerPhone,
      },
    });

    // Recalculate total amount if dates changed
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = calculateNights(checkInDate, checkOutDate);
    const totalAmount = nights * booking.room.pricePerNight;

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        numberOfGuests: parseInt(numberOfGuests),
        status,
        totalAmount,
      },
    });

    return NextResponse.json({ booking: updatedBooking });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Booking update error:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    await prisma.booking.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Booking delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}


