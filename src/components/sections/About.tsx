"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { 
  Users, Shield, Clock,
  Heart, Target
} from 'lucide-react';

// Add this component for animated stats
const AnimatedStat = ({ number, label, suffix = '' }: { number: number; label: string; suffix?: string }) => {
  const { count, countRef } = useCountUp(number, 2000);
  
  return (
    <div ref={countRef} className="space-y-2">
      <div className="text-3xl font-bold text-primary">
        {count}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};

const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const stats = [
    { number: 10000, label: 'Happy Clients', suffix: '+' },
    { number: 50, label: 'Packages Delivered', suffix: 'M+' },
    { number: 200, label: 'Global Locations', suffix: '+' },
    { number: 15, label: 'Years Experience', suffix: '+' }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Reliability',
      description: 'We deliver on our promises with consistent, dependable service you can count on.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Speed',
      description: 'Time is money. We optimize every route and process to get your shipments moving faster.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Care',
      description: 'Every package is handled with care, treating your business as if it were our own.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Constantly evolving our technology and processes to stay ahead of industry changes.'
    }
  ];

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary rounded-full px-4 py-2 mb-4">
            <Users className="w-4 h-4" />
            <span className="text-xl font-medium">About Veloxlogistics</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Moving Your Business Forward
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over a decade, we&apos;ve been the trusted logistics partner for businesses 
            of all sizes, delivering excellence in every shipment.
          </p>
        </motion.div>

        {/* Company Stats with Animation */}
        <motion.div 
          className="bg-gray-50 rounded-xl p-8 mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <AnimatedStat number={stat.number} label={stat.label} suffix={stat.suffix} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values with Stagger Animation */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {value.icon}
                </motion.div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;