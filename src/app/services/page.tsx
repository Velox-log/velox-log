// pages/services.tsx or app/services/page.tsx
"use client";
import React, { useState } from "react";

import {
  Truck,
  Plane,
  Ship,
  Package,
  Warehouse,
  Globe,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Phone,
  MapPin,
  Users,
  Star,
  Zap,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  benefits: string[];
  pricing: string;
  deliveryTime: string;
  coverage: string;
  popular?: boolean;
  image?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const ServicesPage: React.FC = () => {
  const [activeService, setActiveService] = useState<string>("air-freight");

  const services: Service[] = [
    {
      id: "ground-shipping",
      title: "Ground Shipping",
      description:
        "Reliable and cost-effective ground transportation for domestic deliveries with real-time tracking and flexible scheduling options.",
      icon: <Truck className="w-12 h-12" />,
      features: [
        "Same-day and next-day delivery options",
        "Real-time GPS tracking",
        "Flexible pickup and delivery windows",
        "Signature confirmation",
        "Insurance coverage up to $100,000",
        "Climate-controlled vehicles available",
      ],
      benefits: [
        "Cost-effective for domestic shipments",
        "Environmentally friendly option",
        "Reliable delivery schedules",
        "Excellent for heavy or oversized items",
      ],
      pricing: "Starting from $15",
      deliveryTime: "1-5 business days",
      coverage: "Nationwide coverage",
    },
    {
      id: "air-freight",
      title: "Air Freight",
      description:
        "Express air cargo services for time-sensitive shipments with global reach and priority handling for urgent deliveries.",
      icon: <Plane className="w-12 h-12" />,
      features: [
        "Express overnight delivery",
        "International shipping to 200+ countries",
        "Priority cargo handling",
        "Custom clearance assistance",
        "Temperature-controlled options",
        "Dangerous goods certification",
      ],
      benefits: [
        "Fastest delivery option available",
        "Global reach and network",
        "Priority handling for urgent items",
        "Excellent for high-value shipments",
      ],
      pricing: "Starting from $45",
      deliveryTime: "1-3 business days",
      coverage: "Global coverage",
      popular: true,
    },
    {
      id: "ocean-freight",
      title: "Ocean Freight",
      description:
        "Cost-effective sea cargo solutions for large volume international shipments with full container and LCL options.",
      icon: <Ship className="w-12 h-12" />,
      features: [
        "Full Container Load (FCL) services",
        "Less than Container Load (LCL)",
        "Port-to-port and door-to-door service",
        "Customs documentation handling",
        "Container tracking and monitoring",
        "Specialized cargo handling",
      ],
      benefits: [
        "Most economical for large shipments",
        "Ideal for non-urgent bulk cargo",
        "Comprehensive international coverage",
        "Environmentally sustainable option",
      ],
      pricing: "Custom quotes available",
      deliveryTime: "15-45 business days",
      coverage: "Major international ports",
    },
    {
      id: "warehousing",
      title: "Warehousing & Distribution",
      description:
        "Secure storage and distribution solutions with advanced inventory management, pick & pack services, and fulfillment options.",
      icon: <Warehouse className="w-12 h-12" />,
      features: [
        "Climate-controlled facilities",
        "24/7 security and monitoring",
        "Real-time inventory management",
        "Pick, pack, and fulfillment services",
        "Cross-docking capabilities",
        "Returns processing",
      ],
      benefits: [
        "Reduce overhead storage costs",
        "Scalable storage solutions",
        "Advanced inventory visibility",
        "Streamlined order fulfillment",
      ],
      pricing: "Starting from $2/sq ft",
      deliveryTime: "Same-day processing",
      coverage: "50+ warehouse locations",
    },
    {
      id: "express-delivery",
      title: "Express Delivery",
      description:
        "Ultra-fast delivery services for urgent packages and documents with same-day pickup and guaranteed delivery times.",
      icon: <Package className="w-12 h-12" />,
      features: [
        "Same-day and 2-hour delivery",
        "On-demand pickup service",
        "Signature required delivery",
        "Photo proof of delivery",
        "Rush handling available",
        "White glove service",
      ],
      benefits: [
        "Fastest delivery option",
        "Perfect for urgent documents",
        "Flexible scheduling",
        "Premium customer service",
      ],
      pricing: "Starting from $25",
      deliveryTime: "2 hours - same day",
      coverage: "Major metropolitan areas",
    },
    {
      id: "global-logistics",
      title: "Global Logistics Management",
      description:
        "End-to-end international supply chain management with trade compliance, risk management, and consulting services.",
      icon: <Globe className="w-12 h-12" />,
      features: [
        "Supply chain optimization",
        "Trade compliance management",
        "Risk assessment and mitigation",
        "Vendor coordination",
        "Performance analytics",
        "Logistics consulting",
      ],
      benefits: [
        "Complete supply chain visibility",
        "Reduced operational complexity",
        "Cost optimization opportunities",
        "Strategic logistics planning",
      ],
      pricing: "Custom solutions",
      deliveryTime: "Ongoing service",
      coverage: "Global operations",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "How do I track my shipment?",
      answer:
        "You can track your shipment using our online tracking system with your tracking number. We also provide real-time updates via email and SMS notifications.",
    },
    {
      question: "What insurance options are available?",
      answer:
        "We offer comprehensive insurance coverage up to $100,000 for most shipments. Higher coverage amounts are available for valuable items with additional premium.",
    },
    {
      question: "Do you handle international customs clearance?",
      answer:
        "Yes, our experienced customs team handles all documentation and clearance procedures for international shipments, ensuring smooth border crossings.",
    },
    {
      question: "What are your pickup and delivery hours?",
      answer:
        "Standard pickup and delivery hours are 9 AM to 6 PM, Monday through Friday. Extended hours and weekend service are available for express services.",
    },
    {
      question: "How do I get a shipping quote?",
      answer:
        "You can get an instant quote through our website calculator, call our customer service team, or request a custom quote for specialized requirements.",
    },
  ];

  const currentService =
    services.find((service) => service.id === activeService) || services[0];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(30,64,175,0.7), rgba(30,64,175,0.5)), url('/ship3.jpg')`,
      }}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Complete Logistics Solutions
          </h1>
          <p className="text-xl md:text-2xl text-primary-light mb-8 max-w-3xl mx-auto">
            From local deliveries to global supply chain management, we provide
            comprehensive logistics services tailored to your business needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center space-x-2">
              <a href="/tracking">Track Parcel</a>
            </button>
          </div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-12 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeService === service.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="w-5 h-5">
                  {React.isValidElement(service.icon) &&
                    React.cloneElement(
                      service.icon as React.ReactElement<any>,
                      {
                        className: "w-5 h-5",
                      }
                    )}
                </div>
                <span>{service.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Service Info */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-primary text-white p-4 rounded-xl">
                  {currentService.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {currentService.title}
                  </h2>
                  {currentService.popular && (
                    <span className="inline-block bg-secondary text-white text-xs font-semibold px-2 py-1 rounded-full mt-2">
                      Most Popular
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {currentService.description}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-900">
                    {currentService.deliveryTime}
                  </div>
                  <div className="text-xs text-gray-500">Delivery Time</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <MapPin className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-900">
                    {currentService.coverage}
                  </div>
                  <div className="text-xs text-gray-500">Coverage</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <Star className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-900">
                    {currentService.pricing}
                  </div>
                  <div className="text-xs text-gray-500">Starting Price</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <a href="/tracking">Track</a>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <a href="/contact">Send Us Email</a>
                </button>
              </div>
            </div>

            {/* Features & Benefits */}
            <div className="space-y-8">
              {/* Features */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-secondary" />
                  <span>Key Features</span>
                </h3>
                <ul className="space-y-4">
                  {currentService.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-secondary" />
                  <span>Why Choose This Service</span>
                </h3>
                <ul className="space-y-4">
                  {currentService.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our logistics services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 mx-auto mb-6 text-primary-light" />
          <h2 className="text-3xl font-bold mb-4">
            Ready to Optimize Your Logistics?
          </h2>
          <p className="text-xl text-primary-light mb-8">
            Let our experts design a custom logistics solution that fits your
            business needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-secondary hover:bg-secondary-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              <a href="/tracking">Start Your Tracking</a>
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
