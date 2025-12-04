import { prisma } from "@/lib/prisma";

export async function getFeaturedRooms() {
  try {
    const rooms = await prisma.room.findMany({
      where: { isActive: true },
      take: 6,
    });

    return rooms.map((room) => ({
      ...room,
      amenities: JSON.parse(room.amenities || "[]"),
      images: JSON.parse(room.images || "[]"),
    }));
  } catch {
    return [];
  }
}
