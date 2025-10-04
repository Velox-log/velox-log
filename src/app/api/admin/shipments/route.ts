// app/api/admin/shipments/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/../lib/prisma";

// -------------------- GET (list shipments) --------------------
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const shipments = await prisma.shipment.findMany({
      include: {
        sender: {
          select: {
            name: true,
            email: true,
            company: true,
            phone: true,
          },
        },
        events: {
          orderBy: { timestamp: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(shipments);
  } catch (error) {
    console.error("Error fetching shipments:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// -------------------- POST (create new shipment) --------------------
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    if (!user || user.publicMetadata?.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      trackingId,
      origin,
      destination,
      estimatedDelivery,
      service,
      weight,
      dimensions,
      recipientName,
      recipientCompany,
      recipientAddress,
      recipientPhone,
      senderName,
      senderCompany,
      senderPhone,
      senderEmail,
    } = body;

    if (
      !trackingId ||
      !origin ||
      !destination ||
      !recipientName ||
      !recipientAddress ||
      !recipientPhone ||
      !estimatedDelivery ||
      !senderName ||
      !senderPhone
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create sender
    const sender = await prisma.sender.create({
      data: {
        name: senderName,
        company: senderCompany || "",
        phone: senderPhone,
        email: senderEmail || "",
      },
    });

    // Create shipment
    const shipment = await prisma.shipment.create({
      data: {
        trackingId,
        status: "PENDING",
        origin,
        destination,
        estimatedDelivery: new Date(estimatedDelivery),
        service: service || "Ground Shipping",
        weight: weight || "N/A",
        dimensions: dimensions || "N/A",
        currentLocation: origin,
        nextUpdate: "Awaiting pickup",
        recipientName,
        recipientCompany: recipientCompany || "",
        recipientAddress,
        recipientPhone,
        senderId: sender.id,
      },
    });

    await prisma.trackingEvent.create({
      data: {
        shipmentId: shipment.id,
        status: "Shipment Created",
        description: `Shipment created and awaiting pickup from ${origin}`,
        location: origin,
        completed: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Shipment created successfully",
      shipment: {
        id: shipment.id,
        trackingId: shipment.trackingId,
      },
    });
  } catch (error) {
    console.error("Error creating shipment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}