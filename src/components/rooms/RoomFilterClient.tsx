'use client';

import { useState, useMemo } from 'react';
import { RoomFilter } from './RoomFilter';
import { RoomCard } from './RoomCard';

interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  images: string[];
}

interface RoomFilterClientProps {
  initialRooms: Room[];
}

export function RoomFilterClient({ initialRooms }: RoomFilterClientProps) {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    capacity: 0,
  });

  const filteredRooms = useMemo(() => {
    return initialRooms.filter((room) => {
      if (filters.minPrice > 0 && room.pricePerNight < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice < Infinity && room.pricePerNight > filters.maxPrice) {
        return false;
      }
      if (filters.capacity > 0 && room.capacity < filters.capacity) {
        return false;
      }
      return true;
    });
  }, [initialRooms, filters]);

  return (
    <>
      <RoomFilter onFilterChange={setFilters} />
      {filteredRooms.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">
            No rooms found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              name={room.name}
              image={room.images[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'}
              pricePerNight={room.pricePerNight}
              capacity={room.capacity}
              amenities={room.amenities}
              description={room.description}
            />
          ))}
        </div>
      )}
    </>
  );
}



