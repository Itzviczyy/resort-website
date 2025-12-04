import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BookingForm } from '@/components/admin/BookingForm';

async function getBooking(id: string) {
  try {
    return await prisma.booking.findUnique({
      where: { id },
      include: {
        room: true,
        customer: true,
      },
    });
  } catch {
    return null;
  }
}

export default async function EditBookingPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = await getBooking(params.id);

  if (!booking) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Booking</h1>
        <p className="text-muted-foreground">Update booking details</p>
      </div>
      <BookingForm booking={booking} />
    </div>
  );
}


