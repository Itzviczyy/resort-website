import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const room = await prisma.room.update({
      where: { id: params.id },
      data: {
        name,
        description,
        pricePerNight: parseFloat(pricePerNight),
        capacity: parseInt(capacity),
        amenities: typeof amenities === 'string' ? amenities : JSON.stringify(amenities),
        images: typeof images === 'string' ? images : JSON.stringify(images),
        isActive,
      },
    });

    return NextResponse.json({ room });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Room update error:', error);
    return NextResponse.json(
      { error: 'Failed to update room' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    await prisma.room.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Room delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete room' },
      { status: 500 }
    );
  }
}



