import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Calendar, Users, Home, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';

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

export default async function BookingConfirmationPage(props: any) {
  const booking = await getBooking(props.params.id);

  if (!booking) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h1 className="mb-2 text-4xl font-bold">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you, your stay is confirmed
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking ID:</span>
              <span className="font-mono font-semibold">{booking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Room:</span>
              <span className="font-semibold">{booking.room.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Check-in:
              </span>
              <span className="font-semibold">{formatDate(booking.checkIn)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Check-out:
              </span>
              <span className="font-semibold">{formatDate(booking.checkOut)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                Guests:
              </span>
              <span className="font-semibold">{booking.numberOfGuests}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge
                variant={
                  booking.status === 'Confirmed'
                    ? 'default'
                    : booking.status === 'Cancelled'
                    ? 'destructive'
                    : 'secondary'
                }
              >
                {booking.status}
              </Badge>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(booking.totalAmount)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Guest Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-semibold">{booking.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-semibold">{booking.customer.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-semibold">{booking.customer.phone}</span>
            </div>
          </CardContent>
        </Card>

        {booking.specialRequests && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Special Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{booking.specialRequests}</p>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild className="flex-1">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link href="/rooms">
              View More Rooms
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
