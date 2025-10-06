// app/admin/page.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Package,
  Plus,
  Search,
  Edit,
  Truck,
  CheckCircle,
  Copy,
  X,
  User,
  MapPin,
  Building,
  Phone,
  Mail,
  Calendar,
  Weight,
  Ruler,
  FileText,
  AlertCircle,
} from "lucide-react";

interface Shipment {
  id: string;
  trackingId: string;
  status: string;
  origin: string;
  destination: string;
  currentLocation: string;
  estimatedDelivery: string;
  recipientName: string;
  recipientCompany: string;
  recipientAddress: string;
  recipientPhone: string;
  service: string;
  weight: string;
  dimensions: string;
  createdAt: string;
}

interface ShipmentForm {
  origin: string;
  destination: string;
  service: string;
  weight: string;
  dimensions: string;
  recipientName: string;
  recipientCompany: string;
  recipientAddress: string;
  recipientPhone: string;
  recipientEmail: string;
  estimatedDelivery: string;
  notes: string;
  senderName: string;
  senderCompany: string;
  senderPhone: string;
  senderEmail: string;
}

const AdminDashboard: React.FC = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );
  const [creating, setCreating] = useState(false);
  const [newTrackingId, setNewTrackingId] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState<ShipmentForm>({
    origin: '',
    destination: '',
    service: 'Ground Shipping',
    weight: '',
    dimensions: '',
    recipientName: '',
    recipientCompany: '',
    recipientAddress: '',
    recipientPhone: '',
    recipientEmail: '',
    estimatedDelivery: '',
    notes: '',
    senderName: '',
    senderCompany: '',
    senderPhone: '',
    senderEmail: ''
  });

  const [updateForm, setUpdateForm] = useState({
    status: "",
    description: "",
    location: "",
  });

  const fetchShipments = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/shipments");
      if (!response.ok) {
        throw new Error("Failed to fetch shipments");
      }
      const data = await response.json();
      setShipments(data);
    } catch {
      alert("Failed to load shipments. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if user is admin
  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== "admin") {
      router.push("/dashboard");
    } else {
      fetchShipments();
    }
  }, [isLoaded, user, router, fetchShipments]);

  const generateTrackingId = (): string => {
    const prefix = "LF";
    const timestamp = Date.now().toString().slice(-9);
    return `${prefix}${timestamp}`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const trackingId = generateTrackingId();

      const response = await fetch("/api/admin/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          trackingId,
        }),
      });

      if (response.ok) {
        setNewTrackingId(trackingId);
        setShowCreateModal(false);
        setShowSuccessModal(true);
        fetchShipments();
        // Reset form
        setFormData({
          origin: "",
          destination: "",
          service: "Ground Shipping",
          weight: "",
          dimensions: "",
          recipientName: "",
          recipientCompany: "",
          recipientAddress: "",
          recipientPhone: "",
          recipientEmail: "",
          estimatedDelivery: "",
          notes: "",
          senderName: "",
          senderCompany: "",
          senderPhone: "",
          senderEmail: ""
        });
      } else {
        alert("Failed to create shipment");
      }
    } catch {
      alert("Error creating shipment");
    } finally {
      setCreating(false);
    }
  };


  const handleDeleteShipment = async (shipmentId: string) => {
    if (!confirm("Are you sure you want to delete this shipment?")) return;

    try {
      const response = await fetch(`/api/admin/shipments/${shipmentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShipments(shipments.filter((s) => s.id !== shipmentId));
        alert("Shipment deleted successfully!");
      } else {
        alert("Failed to delete shipment.");
      }
    } catch {
      alert("Error deleting shipment.");
    }
  };


  const handleUpdateTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipment) return;
    setUpdating(true); // Start loading
    try {
      const response = await fetch("/api/admin/update-tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackingId: selectedShipment.trackingId,
          ...updateForm,
        }),
      });

      if (response.ok) {
        alert("Tracking updated successfully!");
        setShowUpdateModal(false);
        fetchShipments();
        setUpdateForm({ status: "", description: "", location: "" });
      } else {
        alert("Failed to update tracking");
      }
    } catch {
      alert("Error updating tracking");
    } finally {
      setUpdating(false);
    }
  };

  const copyTrackingId = (trackingId: string) => {
    navigator.clipboard.writeText(trackingId);
    alert("Tracking ID copied to clipboard!");
  };

  const getStatusBadge = (status: string) => {
    const config: { [key: string]: string } = {
      PENDING: "bg-yellow-100 text-yellow-800",
      IN_TRANSIT: "bg-blue-100 text-blue-800",
      DELIVERED: "bg-green-100 text-green-800",
      DELAYED: "bg-red-100 text-red-800",
    };
    return config[status] || "bg-gray-100 text-gray-800";
  };

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.recipientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Create and manage shipments</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Shipment</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Shipments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shipments.length}
                </p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">In Transit</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shipments.filter((s) => s.status === "IN_TRANSIT").length}
                </p>
              </div>
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shipments.filter((s) => s.status === "PENDING").length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shipments.filter((s) => s.status === "DELIVERED").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tracking ID or recipient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Shipments List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              All Shipments
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredShipments.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">No shipments found</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 text-primary hover:underline"
                >
                  Create your first shipment
                </button>
              </div>
            ) : (
              filteredShipments.map((shipment) => (
                <div key={shipment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900">
                          {shipment.trackingId}
                        </h3>
                        <button
                          onClick={() => copyTrackingId(shipment.trackingId)}
                          className="text-gray-400 hover:text-primary"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                            shipment.status
                          )}`}
                        >
                          {shipment.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Route</p>
                          <p className="font-medium">
                            {shipment.origin} → {shipment.destination}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Recipient</p>
                          <p className="font-medium">
                            {shipment.recipientName}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Current Location</p>
                          <p className="font-medium">
                            {shipment.currentLocation}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-4 lg:mt-0">
                      <button
                        onClick={() => {
                          setSelectedShipment(shipment);
                          setShowUpdateModal(true);
                        }}
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDeleteShipment(shipment.id)}
                        className="border border-red-300 hover:bg-red-50 text-red-600 hover:text-red-800 px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Delete</span>
                      </button>

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Shipment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create New Shipment
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form
              onSubmit={handleCreateShipment}
              className="p-6 space-y-6 max-h-[70vh] overflow-y-auto"
            >
              {/* Shipment Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Shipment Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Origin *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., New York, NY"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Los Angeles, CA"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option>Ground Shipping</option>
                      <option>Air Freight</option>
                      <option>Ocean Freight</option>
                      <option>Express Delivery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Delivery *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="estimatedDelivery"
                        value={formData.estimatedDelivery}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight
                    </label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., 2.5 lbs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dimensions
                    </label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder='e.g., 12" x 8" x 4"'
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Sender Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sender Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sender Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="senderName"
                        value={formData.senderName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="senderCompany"
                        value={formData.senderCompany}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="senderPhone"
                        value={formData.senderPhone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="(555) 987-6543"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="senderEmail"
                        value={formData.senderEmail}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipient Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recipient Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="recipientCompany"
                        value={formData.recipientCompany}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="recipientAddress"
                        value={formData.recipientAddress}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Full delivery address"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="recipientPhone"
                        value={formData.recipientPhone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="(555) 123-4567"
                        
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="recipientEmail"
                        value={formData.recipientEmail}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Additional notes or special instructions..."
                  ></textarea>
                </div>
              </div>

              <div className="flex space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {creating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Create Shipment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Shipment Created!
            </h2>
            <p className="text-gray-600 mb-6">
              Tracking ID has been generated successfully
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">Tracking ID</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-primary">
                  {newTrackingId}
                </p>
                <button
                  onClick={() => copyTrackingId(newTrackingId)}
                  className="text-primary hover:text-primary-dark"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Update Tracking Modal */}
      {showUpdateModal && selectedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Update Tracking
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Tracking ID: {selectedShipment.trackingId}
                  </p>
                </div>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateTracking} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status *
                </label>
                <select
                  value={updateForm.status}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, status: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Package Received">Package Received</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Exception">Exception</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={updateForm.location}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, location: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Chicago, IL Distribution Center"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={updateForm.description}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Provide detailed update information..."
                  required
                ></textarea>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {updating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Update Tracking</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;