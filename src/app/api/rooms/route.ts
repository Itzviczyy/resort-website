import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const data = await request.json();
    const {
      name,
      description,
      pricePerNight,
      capacity,
      amenities,
      images,
      isActive,
    } = data;

    const room = await prisma.room.create({
      data: {
        name,
        description,
        pricePerNight: parseFloat(pricePerNight),
        capacity: parseInt(capacity),
        amenities: typeof amenities === 'string' ? amenities : JSON.stringify(amenities),
        images: typeof images === 'string' ? images : JSON.stringify(images),
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ room }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Room creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
}


