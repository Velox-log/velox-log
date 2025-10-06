//  app/tracking/page.tsx
"use client"
import React, { useState } from 'react';
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Copy,
  Download,
  AlertCircle,
  Navigation
} from 'lucide-react';

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  date: string;
  time: string;
  completed: boolean;
}

interface ShipmentDetails {
  trackingId: string;
  status: 'in-transit' | 'delivered' | 'pending' | 'delayed' | 'exception';
  statusText: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  service: string;
  weight: string;
  dimensions: string;
  sender: {
    name: string;
    company: string;
    phone: string;
  };
  recipient: {
    name: string;
    company: string;
    address: string;
    phone: string;
  };
  events: TrackingEvent[];
  currentLocation: string;
  nextUpdate: string;
}

const TrackingPage: React.FC = () => {
  const [trackingId, setTrackingId] = useState<string>('');
  const [shipmentData, setShipmentData] = useState<ShipmentDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');




  const handleTrackPackage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call delay
    try {
      const response = await fetch(`/api/tracking/${trackingId.trim()}`);
      if (response.ok) {
        const data = await response.json()
        setShipmentData(data);
      } else {
        setError('Tracking ID not found. Please check your tracking number and try again.');
        setShipmentData(null);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyTrackingId = () => {
    if (shipmentData) {
      navigator.clipboard.writeText(shipmentData.trackingId);
    }
  };
 // ====== PDF GENERATION FUNCTION - VELOXLOGISTICS FUTURISTIC DESIGN v8.3 ======
const downloadReport = async () => {
  if (!shipmentData) return;

  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;

  // ===== Background =====
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // ===== Header =====
  yPos = 20;
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(" VELOXLOGISTICS TRACKING SYSTEM", pageWidth / 2, yPos, { align: "center" });

  yPos += 6;
  doc.setFontSize(10);
  doc.setTextColor(224, 242, 254);
  doc.text("CARGO MANIFEST ", pageWidth / 2, yPos, {
    align: "center",
  });

  yPos += 15;

  // ===== Tracking ID Card =====
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 25, 3, 3, "F");
  doc.setDrawColor(37, 99, 235);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 25, 3, 3);

  yPos += 8;
  doc.setFontSize(9);
  doc.setTextColor(37, 99, 235);
  doc.text("TRACKING IDENTIFIER", pageWidth / 2, yPos, { align: "center" });

  yPos += 7;
  doc.setFontSize(20);
  doc.setFont("courier", "bold");
  doc.text(shipmentData.trackingId, pageWidth / 2, yPos, { align: "center" });

  yPos += 15;

  // ===== Status Pill =====
  const statusColors: Record<string, [number, number, number]> = {
    delivered: [37, 197, 94],
    "in-transit": [59, 130, 246],
    delayed: [234, 179, 8],
    exception: [239, 68, 68],
    pending: [156, 163, 175],
  };

  const statusColor = statusColors[shipmentData.status] || [156, 163, 175];
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);

  const statusText = shipmentData.statusText.toUpperCase();
  const statusWidth = doc.getTextWidth(statusText) + 12;
  doc.roundedRect((pageWidth - statusWidth) / 2, yPos, statusWidth, 8, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text(statusText, pageWidth / 2, yPos + 5.5, { align: "center" });

  yPos += 20;

  // ===== Sender & Receiver Cards (Redesigned) =====
  const cardWidth = (pageWidth - margin * 3) / 2;
  const cardHeight = 28;

  // Sender Card - white with blue accent
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, yPos, cardWidth, cardHeight, 3, 3, "F");
  doc.setDrawColor(37, 99, 235);
  doc.roundedRect(margin, yPos, cardWidth, cardHeight, 3, 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(37, 99, 235);
  doc.text("SENDER INFORMATION", margin + 5, yPos + 6);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(shipmentData.sender.name, margin + 5, yPos + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(shipmentData.sender.company, margin + 5, yPos + 17);
  doc.text(shipmentData.sender.phone, margin + 5, yPos + 22);

  // Receiver Card
  const receiverX = margin + cardWidth + margin;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(receiverX, yPos, cardWidth, cardHeight, 3, 3, "F");
  doc.setDrawColor(37, 99, 235);
  doc.roundedRect(receiverX, yPos, cardWidth, cardHeight, 3, 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(37, 99, 235);
  doc.text("RECEIVER INFORMATION", receiverX + 5, yPos + 6);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(shipmentData.recipient.name, receiverX + 5, yPos + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(shipmentData.recipient.company, receiverX + 5, yPos + 17);
  doc.text(shipmentData.recipient.phone, receiverX + 5, yPos + 22);

  yPos += cardHeight + 12;

  // ===== Shipment Specs Card =====
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 50, 3, 3, "F");
  doc.setDrawColor(37, 99, 235);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 50, 3, 3);

  yPos += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235);
  doc.text("SHIPMENT SPECIFICATIONS", margin + 5, yPos);

  yPos += 8;
  const dataRows = [
    ["Service Type:", shipmentData.service],
    ["Mass:", shipmentData.weight],
    ["Dimensions:", shipmentData.dimensions],
    ["Est. Delivery:", shipmentData.actualDelivery || shipmentData.estimatedDelivery],
    ["Current Location:", shipmentData.currentLocation],
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  dataRows.forEach(([label, value]) => {
    doc.setTextColor(100, 116, 139);
    doc.text(label, margin + 7, yPos);
    doc.setTextColor(15, 23, 42);
    const valueLines = doc.splitTextToSize(value, pageWidth - margin * 4 - 45);
    doc.text(valueLines, margin + 45, yPos);
    yPos += 7;
  });

  yPos += 12;

  // ===== Transit Log Card =====
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 70, 3, 3, "F");
  doc.setDrawColor(37, 99, 235);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 70, 3, 3);

  yPos += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235);
  doc.text("TRANSIT LOG", margin + 5, yPos);

  yPos += 6;
  shipmentData.events.forEach((event) => {
    if (yPos > pageHeight - 25) {
      doc.addPage();
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, pageWidth, pageHeight, "F");
      yPos = margin;
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, yPos, pageWidth - margin * 2, 70, 3, 3, "F");
      yPos += 8;
      doc.setTextColor(37, 99, 235);
      doc.setFont("helvetica", "bold");
      doc.text("TRANSIT LOG (cont.)", margin + 5, yPos);
      yPos += 6;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(event.status, margin + 10, yPos);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`${event.date} • ${event.time}`, margin + 10, yPos + 4);
    const descLines = doc.splitTextToSize(event.description, pageWidth - margin * 2 - 15);
    doc.text(descLines, margin + 10, yPos + 8);
    yPos += 14;
  });

  // ===== Footer =====
  yPos = pageHeight - 20;
  doc.setFillColor(37, 99, 235);
  doc.rect(0, yPos, pageWidth, 1, "F");
  yPos += 5;
  doc.setFontSize(9);
  doc.setTextColor(224, 242, 254);
  doc.text("⬡ VELOXLOGISTICS FREIGHT SYSTEM", pageWidth / 2, yPos, { align: "center" });
  yPos += 5;
  doc.setFontSize(7);
  doc.setTextColor(224, 242, 254);
  doc.text(`Generated: ${new Date().toLocaleString()} | Document ID: ${shipmentData.trackingId}`, pageWidth / 2, yPos, { align: "center" });

  doc.save(`Veloxlogistics-${shipmentData.trackingId}.pdf`);
};




  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'in-transit':
        return 'text-blue-600 bg-blue-100';
      case 'delayed':
        return 'text-yellow-600 bg-yellow-100';
      case 'exception':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-transit':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'delayed':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'exception':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.7), rgba(30, 64, 175, 0.5)), url('/ship2.jpg')`
      }}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Package className="w-16 h-16 mx-auto mb-6 text-primary-light" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Track Your Package
          </h1>
          <p className="text-xl text-primary-light mb-8">
            Enter your tracking ID to get real-time updates on your shipment
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleTrackPackage} className="space-y-6">
              <div>
                <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="trackingId"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter your tracking ID (e.g., LF123456789)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={loading}
                  />
                  <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Tracking...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Track Package</span>
                  </>
                )}
              </button>
            </form>


          </div>
        </div>
      </section>

      {/* Tracking Results */}
      {shipmentData && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Status Overview */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Tracking ID: {shipmentData.trackingId}</h2>
                    <button
                      onClick={copyTrackingId}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full font-semibold ${getStatusColor(shipmentData.status)}`}>
                    {getStatusIcon(shipmentData.status)}
                    <span>{shipmentData.statusText}</span>
                  </div>
                </div>
                <button className="mt-4 lg:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors flex items-center space-x-2" onClick={downloadReport}>
                  <Download className="w-5 h-5" />
                  <span>Download Report</span>
                </button>
              </div>

              {/* Delivery Info */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex items-center space-x-3">
                  <Navigation className="w-6 h-6 text-primary" />
                  <div>
                    <div className="text-sm text-gray-500">From</div>
                    <div className="font-semibold">{shipmentData.origin}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-secondary" />
                  <div>
                    <div className="text-sm text-gray-500">To</div>
                    <div className="font-semibold">{shipmentData.destination}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-500">
                      {shipmentData.actualDelivery ? 'Delivered' : 'Estimated Delivery'}
                    </div>
                    <div className="font-semibold">
                      {shipmentData.actualDelivery || shipmentData.estimatedDelivery}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

              {/* Tracking Timeline */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Tracking History</h3>

                  <div className="space-y-6">
                    {shipmentData.events.map((event, index) => (
                      <div key={event.id} className="flex space-x-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${event.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                            {event.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          {index < shipmentData.events.length - 1 && (
                            <div className={`w-0.5 h-16 ${event.completed ? 'bg-green-200' : 'bg-gray-200'
                              }`}></div>
                          )}
                        </div>

                        <div className="flex-1 pb-8">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h4 className={`font-semibold ${event.completed ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                              {event.status}
                            </h4>
                            <div className="text-sm text-gray-500">
                              {event.date} at {event.time}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{event.description}</p>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipment Details */}
              <div className="space-y-6">

                {/* Package Details */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Package Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service:</span>
                      <span className="font-medium">{shipmentData.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Weight:</span>
                      <span className="font-medium">{shipmentData.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Dimensions:</span>
                      <span className="font-medium">{shipmentData.dimensions}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-gray-500 mb-1">Current Location:</div>
                      <div className="font-semibold text-primary">{shipmentData.currentLocation}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Next Update:</div>
                      <div className="font-medium">{shipmentData.nextUpdate}</div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-2">SENDER</div>
                      <div className="space-y-1">
                        <div className="font-medium">{shipmentData.sender.name}</div>
                        <div className="text-gray-600">{shipmentData.sender.company}</div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Phone className="w-4 h-4" />
                          <span>{shipmentData.sender.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-sm font-medium text-gray-500 mb-2">RECIPIENT</div>
                      <div className="space-y-1">
                        <div className="font-medium">{shipmentData.recipient.name}</div>
                        <div className="text-gray-600">{shipmentData.recipient.company}</div>
                        <div className="text-sm text-gray-600">{shipmentData.recipient.address}</div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Phone className="w-4 h-4" />
                          <span>{shipmentData.recipient.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className="bg-primary/5 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                  <div className="space-y-4">
                    <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Call Support</span>
                    </button>
                    <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-200 transition-colors flex items-center justify-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <a href="/contact">Send Email</a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TrackingPage;