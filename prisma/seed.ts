import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
    },
  });
  console.log('Created admin user:', admin.username);

  // Create rooms
  const rooms = [
    {
      name: 'Mountain View Deluxe',
      description:
        'Spacious room with breathtaking views of the Vagamon hills. Features a king-size bed, private balcony, and modern amenities. Perfect for couples seeking a romantic getaway.',
      pricePerNight: 3500,
      capacity: 2,
      amenities: JSON.stringify([
        'Mountain View',
        'Private Balcony',
        'King Size Bed',
        'Free Wi-Fi',
        'Complimentary Breakfast',
        'Air Conditioning',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200',
      ]),
      isActive: true,
    },
    {
      name: 'Pine Forest Suite',
      description:
        'Luxurious suite overlooking the pine forests. Features a separate living area, premium furnishings, and large windows offering panoramic views. Ideal for families or extended stays.',
      pricePerNight: 5500,
      capacity: 4,
      amenities: JSON.stringify([
        'Forest View',
        'Separate Living Area',
        'Two Queen Beds',
        'Free Wi-Fi',
        'Complimentary Breakfast',
        'Mini Bar',
        'Air Conditioning',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
      ]),
      isActive: true,
    },
    {
      name: 'Tea Estate Cottage',
      description:
        'Charming cottage with views of the tea plantations. Features traditional architecture with modern comforts. Includes a private garden area and direct access to nature trails.',
      pricePerNight: 4500,
      capacity: 3,
      amenities: JSON.stringify([
        'Tea Estate View',
        'Private Garden',
        'Queen Bed + Single Bed',
        'Free Wi-Fi',
        'Complimentary Breakfast',
        'Campfire Access',
        'Nature Trail Access',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
      ]),
      isActive: true,
    },
    {
      name: 'Meadow View Standard',
      description:
        'Comfortable room with views of the rolling meadows. Perfect for budget-conscious travelers who don\'t want to compromise on comfort. Features all essential amenities.',
      pricePerNight: 2500,
      capacity: 2,
      amenities: JSON.stringify([
        'Meadow View',
        'Double Bed',
        'Free Wi-Fi',
        'Complimentary Breakfast',
        'Air Conditioning',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
      ]),
      isActive: true,
    },
    {
      name: 'Premium Hilltop Villa',
      description:
        'Exclusive villa perched on a hilltop with 360-degree views. Features multiple bedrooms, private terrace, and premium amenities. Perfect for large groups or special occasions.',
      pricePerNight: 8500,
      capacity: 6,
      amenities: JSON.stringify([
        '360-Degree Views',
        'Private Terrace',
        'Three Bedrooms',
        'Free Wi-Fi',
        'Complimentary Breakfast',
        'Mini Bar',
        'Room Service',
        'Private Parking',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200',
      ]),
      isActive: true,
    },
  ];

  const createdRooms = [];
  for (const roomData of rooms) {
    const room = await prisma.room.upsert({
      where: { name: roomData.name },
      update: {},
      create: roomData,
    });
    createdRooms.push(room);
    console.log('Created room:', room.name);
  }

  // Create customers
  const customers = [
    {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '+91 98765 43210',
    },
    {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43211',
    },
    {
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      phone: '+91 98765 43212',
    },
    {
      name: 'Sneha Menon',
      email: 'sneha.menon@example.com',
      phone: '+91 98765 43213',
    },
    {
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '+91 98765 43214',
    },
    {
      name: 'Anjali Nair',
      email: 'anjali.nair@example.com',
      phone: '+91 98765 43215',
    },
    {
      name: 'Rahul Iyer',
      email: 'rahul.iyer@example.com',
      phone: '+91 98765 43216',
    },
    {
      name: 'Meera Krishnan',
      email: 'meera.krishnan@example.com',
      phone: '+91 98765 43217',
    },
    {
      name: 'Arjun Pillai',
      email: 'arjun.pillai@example.com',
      phone: '+91 98765 43218',
    },
    {
      name: 'Kavya Suresh',
      email: 'kavya.suresh@example.com',
      phone: '+91 98765 43219',
    },
  ];

  const createdCustomers = [];
  for (const customerData of customers) {
    const customer = await prisma.customer.upsert({
      where: { email: customerData.email },
      update: {},
      create: customerData,
    });
    createdCustomers.push(customer);
    console.log('Created customer:', customer.name);
  }

  // Create bookings
  const now = new Date();
  const bookings = [
    {
      customerId: createdCustomers[0].id,
      roomId: createdRooms[0].id,
      checkIn: new Date(now.getFullYear(), now.getMonth(), 5),
      checkOut: new Date(now.getFullYear(), now.getMonth(), 7),
      numberOfGuests: 2,
      totalAmount: 7000,
      status: 'Confirmed',
    },
    {
      customerId: createdCustomers[1].id,
      roomId: createdRooms[1].id,
      checkIn: new Date(now.getFullYear(), now.getMonth(), 10),
      checkOut: new Date(now.getFullYear(), now.getMonth(), 12),
      numberOfGuests: 4,
      totalAmount: 11000,
      status: 'Confirmed',
    },
    {
      customerId: createdCustomers[2].id,
      roomId: createdRooms[2].id,
      checkIn: new Date(now.getFullYear(), now.getMonth(), 15),
      checkOut: new Date(now.getFullYear(), now.getMonth(), 18),
      numberOfGuests: 3,
      totalAmount: 13500,
      status: 'Pending',
    },
    {
      customerId: createdCustomers[3].id,
      roomId: createdRooms[0].id,
      checkIn: new Date(now.getFullYear(), now.getMonth() + 1, 1),
      checkOut: new Date(now.getFullYear(), now.getMonth() + 1, 3),
      numberOfGuests: 2,
      totalAmount: 7000,
      status: 'Confirmed',
    },
    {
      customerId: createdCustomers[4].id,
      roomId: createdRooms[3].id,
      checkIn: new Date(now.getFullYear(), now.getMonth() + 1, 5),
      checkOut: new Date(now.getFullYear(), now.getMonth() + 1, 7),
      numberOfGuests: 2,
      totalAmount: 5000,
      status: 'Confirmed',
    },
  ];

  for (const bookingData of bookings) {
    const booking = await prisma.booking.create({
      data: bookingData,
    });
    console.log('Created booking:', booking.id);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

