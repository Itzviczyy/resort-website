'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export function QuickBookingWidget() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const handleCheckAvailability = () => {
    if (checkIn && checkOut) {
      const params = new URLSearchParams({
        checkIn,
        checkOut,
        guests,
      });
      router.push(`/rooms?${params.toString()}`);
    }
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full bg-white/95 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="check-in" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Check-in
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
              Check-out
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
              Guests
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
          <div className="flex items-end">
            <Button
              onClick={handleCheckAvailability}
              className="w-full"
              size="lg"
            >
              <Search className="mr-2 h-4 w-4" />
              Check Availability
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



