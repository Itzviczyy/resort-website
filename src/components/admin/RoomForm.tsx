'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';

const roomSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  pricePerNight: z.coerce.number().min(0, 'Price must be positive'),
  capacity: z.coerce.number().min(1).max(10),
  isActive: z.boolean(),
  amenities: z.array(z.string()),
  images: z.array(z.string().url('Must be a valid URL')),
});

type RoomFormData = z.infer<typeof roomSchema>;

interface RoomFormProps {
  room?: {
    id: string;
    name: string;
    description: string;
    pricePerNight: number;
    capacity: number;
    amenities: string[];
    images: string[];
    isActive: boolean;
  };
}

export function RoomForm({ room }: RoomFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amenityInput, setAmenityInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: room
      ? {
          name: room.name,
          description: room.description,
          pricePerNight: room.pricePerNight,
          capacity: room.capacity,
          isActive: room.isActive,
          amenities: room.amenities,
          images: room.images,
        }
      : {
          amenities: [],
          images: [],
          isActive: true,
        },
  });

  const amenities = watch('amenities') || [];
  const images = watch('images') || [];

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setValue('amenities', [...amenities, amenityInput.trim()]);
      setAmenityInput('');
    }
  };

  const removeAmenity = (index: number) => {
    setValue(
      'amenities',
      amenities.filter((_, i) => i !== index)
    );
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setValue('images', [...images, imageInput.trim()]);
      setImageInput('');
    }
  };

  const removeImage = (index: number) => {
    setValue(
      'images',
      images.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: RoomFormData) => {
    setIsSubmitting(true);
    try {
      const url = room ? `/api/rooms/${room.id}` : '/api/rooms';
      const method = room ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          amenities: JSON.stringify(data.amenities),
          images: JSON.stringify(data.images),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save room');
      }

      router.push('/admin/rooms');
      router.refresh();
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save room. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/rooms">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-xl font-semibold">
          {room ? 'Edit Room' : 'Create New Room'}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Room Name *</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register('description')}
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pricePerNight">Price Per Night (₹) *</Label>
              <Input
                id="pricePerNight"
                type="number"
                step="0.01"
                {...register('pricePerNight')}
              />
              {errors.pricePerNight && (
                <p className="text-sm text-destructive">
                  {errors.pricePerNight.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity (Guests) *</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                max="10"
                {...register('capacity')}
              />
              {errors.capacity && (
                <p className="text-sm text-destructive">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              {...register('isActive')}
              className="h-4 w-4"
            />
            <Label htmlFor="isActive">Active (available for booking)</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addAmenity();
                }
              }}
              placeholder="Add amenity (e.g., Free Wi-Fi)"
            />
            <Button type="button" onClick={addAmenity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm"
              >
                <span>{amenity}</span>
                <button
                  type="button"
                  onClick={() => removeAmenity(index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addImage();
                }
              }}
              placeholder="Image URL (e.g., https://images.unsplash.com/...)"
            />
            <Button type="button" onClick={addImage}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Room image ${index + 1}`}
                  className="h-32 w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          {errors.images && (
            <p className="text-sm text-destructive">{errors.images.message}</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/rooms')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : room ? 'Update Room' : 'Create Room'}
        </Button>
      </div>
    </form>
  );
}



