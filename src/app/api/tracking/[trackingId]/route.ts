import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: Date;
  completed: boolean;
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ trackingId: string }> }
) {
  const { trackingId } = await context.params; // 👈 await params

  try {
    const shipment = await prisma.shipment.findUnique({
      where: { trackingId },
      include: {
        events: {
          orderBy: { timestamp: "desc" },
        },
        sender: {
          select: {
            name: true,
            company: true,
            phone: true,
          },
        },
      },
    });

    if (!shipment) {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }

    const response = {
      trackingId: shipment.trackingId,
      status: shipment.status.toLowerCase().replace("_", "-"),
      statusText: shipment.status.replace("_", " "),
      origin: shipment.origin,
      destination: shipment.destination,
      estimatedDelivery: shipment.estimatedDelivery.toISOString(),
      actualDelivery: shipment.actualDelivery?.toISOString(),
      service: shipment.service,
      weight: shipment.weight,
      dimensions: shipment.dimensions,
      currentLocation: shipment.currentLocation,
      nextUpdate: shipment.nextUpdate,
      sender: shipment.sender
        ? {
            name: shipment.sender.name || "N/A",
            company: shipment.sender.company || "N/A",
            phone: shipment.sender.phone || "N/A",
          }
        : {
            name: "Velox Admin",
            company: "Velox Logistics",
            phone: "(555) 123-4567",
          },
      recipient: {
        name: shipment.recipientName,
        company: shipment.recipientCompany || "N/A",
        address: shipment.recipientAddress,
        phone: shipment.recipientPhone,
      },
      events: shipment.events.map((event: TrackingEvent) => ({
        id: event.id,
        status: event.status,
        description: event.description,
        location: event.location,
        timestamp: event.timestamp.toISOString(),
        date: event.timestamp.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        time: event.timestamp.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        completed: event.completed,
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Tracking API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
