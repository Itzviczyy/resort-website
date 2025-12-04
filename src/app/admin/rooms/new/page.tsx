import { RoomForm } from '@/components/admin/RoomForm';

export default function NewRoomPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Room</h1>
        <p className="text-muted-foreground">
          Add a new room type to your resort
        </p>
      </div>
      <RoomForm />
    </div>
  );
}



