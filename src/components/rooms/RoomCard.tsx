import Image from 'next/image';
import Link from 'next/link';
import { Bed, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

interface RoomCardProps {
  id: string;
  name: string;
  image: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  description: string;
}

export function RoomCard({
  id,
  name,
  image,
  pricePerNight,
  capacity,
  amenities,
  description,
}: RoomCardProps) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-semibold">{name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
        <div className="mb-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-primary" />
            <span>{capacity} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-primary" />
            <span>{capacity === 1 ? 'Single' : capacity === 2 ? 'Double' : 'Multiple'} Bed</span>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{amenities.length - 3} more
            </Badge>
          )}
        </div>
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(pricePerNight)}
          </span>
          <span className="text-sm text-muted-foreground"> / night</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-6 pt-0">
        <Button variant="outline" asChild className="flex-1">
          <Link href={`/rooms/${id}`}>View Details</Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href={`/booking?roomId=${id}`}>
            Book Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}



