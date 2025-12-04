import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { RoomForm } from '@/components/admin/RoomForm';

async function getRoom(id: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { id },
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

export default async function EditRoomPage({
  params,
}: {
  params: { id: string };
}) {
  const room = await getRoom(params.id);

  if (!room) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Room</h1>
        <p className="text-muted-foreground">Update room details</p>
      </div>
      <RoomForm room={room} />
    </div>
  );
}


