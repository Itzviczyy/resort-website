import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { RoomCard } from '@/components/rooms/RoomCard';
import { RoomFilter } from '@/components/rooms/RoomFilter';
import { RoomFilterClient } from '@/components/rooms/RoomFilterClient';

async function getRooms() {
  try {
    const rooms = await prisma.room.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    return rooms.map((room) => ({
      ...room,
      amenities: JSON.parse(room.amenities || '[]'),
      images: JSON.parse(room.images || '[]'),
    }));
  } catch {
    return [];
  }
}

export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Our Rooms</h1>
        <p className="text-lg text-muted-foreground">
          Choose from our selection of comfortable and luxurious rooms
        </p>
      </div>

      <Suspense fallback={<div>Loading filters...</div>}>
        <RoomFilterClient initialRooms={rooms} />
      </Suspense>
    </div>
  );
}


