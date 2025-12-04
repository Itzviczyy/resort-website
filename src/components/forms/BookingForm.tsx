'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Users, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const bookingSchema = z.object({
  roomId: z.string().min(1, 'Please select a room'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  numberOfGuests: z.coerce.number().min(1).max(10),
  specialRequests: z.string().optional(),
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
  rooms: Array<{ id: string; name: string; pricePerNight: number; capacity: number }>;
  preSelectedRoomId?: string;
  preFilledData?: {
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  };
}

export function BookingForm({ rooms, preSelectedRoomId, preFilledData }: BookingFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[0] | null>(null);
  const [nights, setNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      roomId: preSelectedRoomId || searchParams.get('roomId') || '',
      checkIn: preFilledData?.checkIn || searchParams.get('checkIn') || '',
      checkOut: preFilledData?.checkOut || searchParams.get('checkOut') || '',
      numberOfGuests: Number(preFilledData?.guests || searchParams.get('guests') || 2),
    },
  });

  const roomId = watch('roomId');
  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  useEffect(() => {
    const room = rooms.find((r) => r.id === roomId);
    setSelectedRoom(room || null);
  }, [roomId, rooms]);

  useEffect(() => {
    if (checkIn && checkOut && selectedRoom) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
      setTotalAmount(diffDays * selectedRoom.pricePerNight);
    }
  }, [checkIn, checkOut, selectedRoom]);

  const today = new Date().toISOString().split('T')[0];

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setAvailabilityError(null);

    try {
      // Check availability
      const availabilityResponse = await fetch('/api/bookings/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: data.roomId,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
        }),
      });

      const availabilityData = await availabilityResponse.json();

      if (!availabilityData.available) {
        setAvailabilityError(availabilityData.message || 'Room is not available for the selected dates');
        setIsSubmitting(false);
        return;
      }

      // Create booking
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const bookingData = await bookingResponse.json();

      if (!bookingResponse.ok) {
        throw new Error(bookingData.error || 'Failed to create booking');
      }

      router.push(`/booking/confirmation/${bookingData.booking.id}`);
    } catch (error) {
      setAvailabilityError(error instanceof Error ? error.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roomId">Select Room *</Label>
            <Select
              id="roomId"
              {...register('roomId')}
              onChange={(e) => {
                setValue('roomId', e.target.value);
                setAvailabilityError(null);
              }}
            >
              <option value="">Choose a room...</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} - {formatCurrency(room.pricePerNight)}/night (Max {room.capacity} guests)
                </option>
              ))}
            </Select>
            {errors.roomId && (
              <p className="text-sm text-destructive">{errors.roomId.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="checkIn" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Check-in Date *
              </Label>
              <Input
                id="checkIn"
                type="date"
                {...register('checkIn')}
                min={today}
                onChange={(e) => {
                  setValue('checkIn', e.target.value);
                  setAvailabilityError(null);
                }}
              />
              {errors.checkIn && (
                <p className="text-sm text-destructive">{errors.checkIn.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Check-out Date *
              </Label>
              <Input
                id="checkOut"
                type="date"
                {...register('checkOut')}
                min={checkIn || today}
                onChange={(e) => {
                  setValue('checkOut', e.target.value);
                  setAvailabilityError(null);
                }}
              />
              {errors.checkOut && (
                <p className="text-sm text-destructive">{errors.checkOut.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfGuests" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Number of Guests *
            </Label>
            <Input
              id="numberOfGuests"
              type="number"
              min="1"
              max="10"
              {...register('numberOfGuests')}
            />
            {errors.numberOfGuests && (
              <p className="text-sm text-destructive">{errors.numberOfGuests.message}</p>
            )}
          </div>

          {selectedRoom && nights > 0 && (
            <div className="rounded-lg bg-primary/5 p-4">
              <div className="flex justify-between text-sm">
                <span>Price per night:</span>
                <span>{formatCurrency(selectedRoom.pricePerNight)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Number of nights:</span>
                <span>{nights}</span>
              </div>
              <div className="mt-2 flex justify-between border-t pt-2 font-semibold">
                <span>Total Amount:</span>
                <span className="text-primary">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name *
            </Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email *
            </Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number *
            </Label>
            <Input id="phone" type="tel" {...register('phone')} />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Special Requests (Optional)
            </Label>
            <Textarea
              id="specialRequests"
              {...register('specialRequests')}
              rows={4}
              placeholder="Any special requests or requirements..."
            />
          </div>
        </CardContent>
      </Card>

      {availabilityError && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {availabilityError}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Confirm Booking'}
      </Button>
    </form>
  );
}


