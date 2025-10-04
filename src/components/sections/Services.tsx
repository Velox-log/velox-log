"use client"
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Truck, Plane, Ship, Package, Warehouse, ArrowRight, Globe,
} from "lucide-react";
import Link from "next/link"

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
}

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services: Service[] = [
    {
      id: "ground-shipping",
      title: "Ground Shipping",
      description: "Fast and reliable ground transportation for domestic deliveries across the country.",
      icon: <Truck className="w-8 h-8" />,
      features: ["Same-day delivery", "Real-time tracking", "Flexible scheduling", "Insurance coverage"],
    },
    {
      id: "air-freight",
      title: "Air Freight",
      description: "Express air cargo services for time-sensitive shipments worldwide.",
      icon: <Plane className="w-8 h-8" />,
      features: ["Express delivery", "Global network", "Priority handling", "Custom clearance"],
      popular: true,
    },
    {
      id: "ocean-freight",
      title: "Ocean Freight",
      description: "Cost-effective sea cargo solutions for large volume international shipments.",
      icon: <Ship className="w-8 h-8" />,
      features: ["Container shipping", "Port-to-port service", "Bulk cargo", "Documentation"],
    },
    {
      id: "warehousing",
      title: "Warehousing",
      description: "Secure storage and distribution solutions with advanced inventory management.",
      icon: <Warehouse className="w-8 h-8" />,
      features: ["Climate controlled", "24/7 security", "Inventory management", "Pick & pack"],
    },
    {
      id: "express-delivery",
      title: "Express Delivery",
      description: "Ultra-fast delivery services for urgent packages and documents.",
      icon: <Package className="w-8 h-8" />,
      features: ["Next-day delivery", "Same-day pickup", "Signature required", "Photo proof"],
    },
    {
      id: "global-logistics",
      title: "Global Logistics",
      description: "End-to-end international supply chain management and coordination.",
      icon: <Globe className="w-8 h-8" />,
      features: ["Supply chain", "Trade compliance", "Risk management", "Consulting"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
            <Package className="w-4 h-4" />
            <span className="text-xl font-medium">Our Services</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Logistics Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From local deliveries to global supply chain management, we provide
            comprehensive logistics services tailored to your business needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`relative bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                service.popular
                  ? "border-secondary ring-2 ring-secondary/20"
                  : "border-gray-200"
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <motion.div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  <span className="bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </motion.div>
              )}

              {/* Icon */}
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-lg mb-6 ${
                  service.popular
                    ? "bg-secondary text-white"
                    : "bg-primary text-white"
                }`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {service.icon}
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, fIndex) => (
                  <motion.li 
                    key={fIndex} 
                    className="flex items-center text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 + fIndex * 0.05 }}
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href="/services" className="w-full items-center flex btn-primary hover:text-secondary group">
                <span>Learn More</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;