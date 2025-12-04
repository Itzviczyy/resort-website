'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ImageLightbox } from '@/components/gallery/ImageLightbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    alt: 'Vagamon Hills',
    category: 'Nature',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
    alt: 'Pine Forest',
    category: 'Nature',
  },
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
    alt: 'Mountain View',
    category: 'Nature',
  },
  {
    src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200',
    alt: 'Tea Estates',
    category: 'Nature',
  },
  {
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
    alt: 'Resort Room',
    category: 'Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200',
    alt: 'Luxury Suite',
    category: 'Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
    alt: 'Resort Balcony',
    category: 'Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1551524164-6cf77f5e7f8e?w=1200',
    alt: 'Paragliding',
    category: 'Activities',
  },
  {
    src: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200',
    alt: 'Jeep Safari',
    category: 'Activities',
  },
  {
    src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
    alt: 'Resort Dining',
    category: 'Food',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
    alt: 'Breakfast Spread',
    category: 'Food',
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200',
    alt: 'Resort Exterior',
    category: 'Resort',
  },
  {
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
    alt: 'Resort Lobby',
    category: 'Resort',
  },
  {
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
    alt: 'Resort Garden',
    category: 'Resort',
  },
  {
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200',
    alt: 'Campfire',
    category: 'Activities',
  },
];

const categories = ['All', 'Room', 'Nature', 'Activities', 'Food', 'Resort'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Photo Gallery</h1>
        <p className="text-lg text-muted-foreground">
          Explore the beauty of our resort and Vagamon
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative h-64 w-full cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setLightboxImage(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-sm text-white">{image.alt}</p>
              <Badge variant="secondary" className="mt-1">
                {image.category}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>

      {lightboxImage !== null && (
        <ImageLightbox
          images={filteredImages}
          initialIndex={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}


