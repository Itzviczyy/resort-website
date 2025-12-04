'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

const bookingSchema = z.object({
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  numberOfGuests: z.coerce.number().min(1).max(10),
  status: z.enum(['Pending', 'Confirmed', 'Cancelled']),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
}).refine((data) => {
  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);
  return checkOut > checkIn;
}, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOut'],
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  booking: {
    id: string;
    checkIn: Date;
    checkOut: Date;
    numberOfGuests: number;
    status: string;
    customer: { name: string; phone: string };
    room: { name: string };
  };
}

export function BookingForm({ booking }: BookingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      checkIn: formatDate(booking.checkIn).split(',')[0] === formatDate(new Date()).split(',')[0]
        ? new Date(booking.checkIn).toISOString().split('T')[0]
        : new Date(booking.checkIn).toISOString().split('T')[0],
      checkOut: new Date(booking.checkOut).toISOString().split('T')[0],
      numberOfGuests: booking.numberOfGuests,
      status: booking.status as 'Pending' | 'Confirmed' | 'Cancelled',
      customerName: booking.customer.name,
      customerPhone: booking.customer.phone,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking');
      }

      router.push('/admin/bookings');
      router.refresh();
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  const checkInDate = new Date(booking.checkIn).toISOString().split('T')[0];
  const checkOutDate = new Date(booking.checkOut).toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/bookings">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-xl font-semibold">Edit Booking</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Room</Label>
            <Input value={booking.room.name} disabled />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-in Date *</Label>
              <Input
                id="checkIn"
                type="date"
                {...register('checkIn')}
              />
              {errors.checkIn && (
                <p className="text-sm text-destructive">{errors.checkIn.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out Date *</Label>
              <Input
                id="checkOut"
                type="date"
                {...register('checkOut')}
              />
              {errors.checkOut && (
                <p className="text-sm text-destructive">{errors.checkOut.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfGuests">Number of Guests *</Label>
            <Input
              id="numberOfGuests"
              type="number"
              min="1"
              max="10"
              {...register('numberOfGuests')}
            />
            {errors.numberOfGuests && (
              <p className="text-sm text-destructive">
                {errors.numberOfGuests.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select id="status" {...register('status')}>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
            {errors.status && (
              <p className="text-sm text-destructive">{errors.status.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input id="customerName" {...register('customerName')} />
            {errors.customerName && (
              <p className="text-sm text-destructive">
                {errors.customerName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerPhone">Customer Phone *</Label>
            <Input id="customerPhone" type="tel" {...register('customerPhone')} />
            {errors.customerPhone && (
              <p className="text-sm text-destructive">
                {errors.customerPhone.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/bookings')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Booking'}
        </Button>
      </div>
    </form>
  );
}


