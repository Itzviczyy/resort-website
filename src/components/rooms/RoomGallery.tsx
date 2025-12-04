'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoomGalleryProps {
  images: string[];
  roomName: string;
}

export function RoomGallery({ images, roomName }: RoomGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (images.length === 0) {
    return (
      <div className="relative h-96 w-full overflow-hidden rounded-lg bg-slate-200">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
          alt={roomName}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
          <Image
            src={images[0]}
            alt={roomName}
            fill
            className="cursor-pointer object-cover"
            onClick={() => setSelectedImage(images[0])}
          />
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {images.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className="relative h-24 w-full overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${roomName} ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="relative h-[90vh] w-[90vw] max-w-6xl">
            <Image
              src={selectedImage}
              alt={roomName}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}


