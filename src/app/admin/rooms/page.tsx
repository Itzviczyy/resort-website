import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { DeleteRoomButton } from '@/components/admin/DeleteRoomButton';

async function getRooms() {
  try {
    return await prisma.room.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export default async function AdminRoomsPage() {
  const rooms = await getRooms();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rooms Management</h1>
          <p className="text-muted-foreground">
            Manage all room types and their details
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/rooms/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Room
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price/Night</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No rooms found. Create your first room!
                </TableCell>
              </TableRow>
            ) : (
              rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-mono text-xs">
                    {room.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell className="font-medium">{room.name}</TableCell>
                  <TableCell>{formatCurrency(room.pricePerNight)}</TableCell>
                  <TableCell>{room.capacity} guests</TableCell>
                  <TableCell>
                    <Badge variant={room.isActive ? 'default' : 'secondary'}>
                      {room.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/rooms/${room.id}/edit`}>
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Link>
                      </Button>
                      <DeleteRoomButton roomId={room.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


