export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  customerId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  numberOfGuests: number;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  specialRequests?: string | null;
  createdAt: Date;
  updatedAt: Date;
  customer?: Customer;
  room?: Room;
}

export interface BookingFormData {
  roomId: string;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  specialRequests?: string;
}



