import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Users, Check, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { RoomGallery } from '@/components/rooms/RoomGallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { RoomBookingWidget } from '@/components/forms/RoomBookingWidget';

async function getRoom(id: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { id, isActive: true },
    });
    if (!room) return null;
    return {
      ...room,
      amenities: JSON.parse(room.amenities || '[]'),
      images: JSON.parse(room.images || '[]'),
    };
  } catch {
    return null;
  }
}

export default async function RoomDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const room = await getRoom(params.id);

  if (!room) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link
          href="/rooms"
          className="text-muted-foreground hover:text-primary"
        >
          ← Back to Rooms
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <RoomGallery images={room.images} roomName={room.name} />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-4xl font-bold">{room.name}</h1>
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary">
                {formatCurrency(room.pricePerNight)}
              </span>
              <span className="text-muted-foreground"> / night</span>
            </div>
            <p className="text-lg text-muted-foreground">{room.description}</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">Capacity: {room.capacity} Guests</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary">
                      <Check className="mr-1 h-3 w-3" />
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <RoomBookingWidget roomId={room.id} roomName={room.name} />
        </div>
      </div>
    </div>
  );
}



