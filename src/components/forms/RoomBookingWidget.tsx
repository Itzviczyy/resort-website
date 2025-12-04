'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoomBookingWidgetProps {
  roomId: string;
  roomName: string;
}

export function RoomBookingWidget({ roomId, roomName }: RoomBookingWidgetProps) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const handleBook = () => {
    if (checkIn && checkOut) {
      const params = new URLSearchParams({
        roomId,
        checkIn,
        checkOut,
        guests,
      });
      router.push(`/booking?${params.toString()}`);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book This Room</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="check-in" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Check-in Date
          </Label>
          <Input
            id="check-in"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={today}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="check-out" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Check-out Date
          </Label>
          <Input
            id="check-out"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || today}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="guests" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Number of Guests
          </Label>
          <Input
            id="guests"
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <Button onClick={handleBook} className="w-full" size="lg">
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}



