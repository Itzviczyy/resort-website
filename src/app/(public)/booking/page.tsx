import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { BookingForm } from '@/components/forms/BookingForm';

async function getRooms() {
  try {
    const rooms = await prisma.room.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        pricePerNight: true,
        capacity: true,
      },
      orderBy: { name: 'asc' },
    });
    return rooms;
  } catch {
    return [];
  }
}

export default async function BookingPage() {
  const rooms = await getRooms();

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Book Your Stay</h1>
        <p className="text-lg text-muted-foreground">
          Fill in the details below to complete your booking
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Suspense fallback={<div>Loading booking form...</div>}>
          <BookingForm rooms={rooms} />
        </Suspense>
      </div>
    </div>
  );
}


