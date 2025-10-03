// app/api/admin/update-tracking/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma, ShipmentStatus } from '@/../lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await currentUser();
    if (!user || user.publicMetadata?.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { trackingId, status, description, location } = body;

    if (!trackingId || !status || !description || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const shipment = await prisma.shipment.findUnique({
      where: { trackingId },
    });

    if (!shipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      );
    }

    const trackingEvent = await prisma.trackingEvent.create({
      data: {
        shipmentId: shipment.id,
        status,
        description,
        location,
        completed: true,
        timestamp: new Date(),
      },
    });

    // Use the ShipmentStatus enum
    const statusMap: { [key: string]: ShipmentStatus } = {
      'Package Received': ShipmentStatus.PENDING,
      'In Transit': ShipmentStatus.IN_TRANSIT,
      'Out for Delivery': ShipmentStatus.IN_TRANSIT,
      'Delivered': ShipmentStatus.DELIVERED,
      'Delayed': ShipmentStatus.DELAYED,
      'Exception': ShipmentStatus.EXCEPTION,
    };

    await prisma.shipment.update({
      where: { trackingId },
      data: {
        status: statusMap[status] || ShipmentStatus.IN_TRANSIT,
        currentLocation: location,
        actualDelivery: status === 'Delivered' ? new Date() : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Tracking updated successfully',
      event: trackingEvent,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}