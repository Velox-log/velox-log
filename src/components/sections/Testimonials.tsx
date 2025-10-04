"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { 
  Star, Quote, ChevronLeft, ChevronRight,
  Award, MessageSquare, Users, TrendingUp
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  quote: string;
  industry: string;
  shipmentVolume: string;
}

// Animated Stat Component
const AnimatedStat = ({ number, label, icon }: { number: number; label: string; icon: React.ReactNode }) => {
  const { count, countRef } = useCountUp(number, 2000);
  
  return (
    <div ref={countRef} className="text-center">
      <motion.div 
        className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
      <motion.div 
        className="text-3xl font-bold text-gray-900 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {count < 5 ? count.toFixed(1) : count}{count < 5 ? '/5' : count < 100 ? '%' : count < 1000 ? 'K+' : 'K+'}
      </motion.div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      position: 'Supply Chain Director',
      company: 'TechCorp Industries',
      rating: 5,
      quote: "Veloxlogistics transformed our supply chain operations. Their real-time tracking and reliable delivery times have improved our customer satisfaction by 40%. The team is incredibly responsive and always goes above and beyond.",
      industry: 'Technology',
      shipmentVolume: '500+ monthly shipments'
    },
    {
      id: '2',
      name: 'Michael Chen',
      position: 'Operations Manager',
      company: 'Global Fashion Co.',
      rating: 5,
      quote: "Working with Veloxlogistics for our international shipping has been a game-changer. They handle everything from customs to final delivery seamlessly. Our products reach customers faster than ever before.",
      industry: 'Fashion & Retail',
      shipmentVolume: '1000+ monthly shipments'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      position: 'CEO',
      company: 'StartupXYZ',
      rating: 5,
      quote: "As a growing startup, we needed a logistics partner that could scale with us. Veloxlogistics has been that partner. Their flexible solutions and competitive pricing have been crucial to our growth.",
      industry: 'E-commerce',
      shipmentVolume: '200+ monthly shipments'
    },
    {
      id: '4',
      name: 'David Thompson',
      position: 'Logistics Coordinator',
      company: 'MedSupply Plus',
      rating: 5,
      quote: "In the medical supply industry, reliability is everything. Veloxlogistics understands this and consistently delivers our temperature-sensitive products on time and in perfect condition.",
      industry: 'Healthcare',
      shipmentVolume: '300+ monthly shipments'
    },
    {
      id: '5',
      name: 'Lisa Park',
      position: 'Import/Export Manager',
      company: 'Global Trade Hub',
      rating: 5,
      quote: "Veloxlogistic's international expertise is unmatched. They navigate complex regulations and ensure our shipments clear customs smoothly. Their transparency and communication are exceptional.",
      industry: 'Import/Export',
      shipmentVolume: '800+ monthly shipments'
    }
  ];

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
      >
        <Star 
          className={`w-5 h-5 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`} 
        />
      </motion.div>
    ));
  };

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xl font-medium">Customer Stories</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our customers say about 
            their experience with Veloxlogistic&apos;s logistics solutions.
          </p>
        </motion.div>

        {/* Main Testimonial Slider */}
        <motion.div 
          className="relative mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto overflow-hidden">
            
            {/* Quote Icon */}
            <motion.div 
              className="flex justify-center mb-8"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <div className="bg-primary/10 p-4 rounded-full">
                <Quote className="w-8 h-8 text-primary" />
              </div>
            </motion.div>

            {/* Testimonial Content */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center space-x-1 mb-6">
                  {renderStars(testimonials[currentSlide].rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                  {testimonials[currentSlide].quote}
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col items-center space-y-4">
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-white text-xl font-bold">
                      {testimonials[currentSlide].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </motion.div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {testimonials[currentSlide].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentSlide].position}
                    </p>
                    <p className="text-primary font-medium">
                      {testimonials[currentSlide].company}
                    </p>
                  </div>

                  {/* Additional Info */}
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{testimonials[currentSlide].industry}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>{testimonials[currentSlide].shipmentVolume}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl rounded-full p-3 text-gray-600 hover:text-primary transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl rounded-full p-3 text-gray-600 hover:text-primary transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Section with Animated Counters */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatedStat 
            number={4.9} 
            label="Average Rating" 
            icon={<Star className="w-8 h-8 text-green-600" />}
          />
          <AnimatedStat 
            number={10000} 
            label="Happy Customers" 
            icon={<Users className="w-8 h-8 text-blue-600" />}
          />
          <AnimatedStat 
            number={98} 
            label="Customer Retention" 
            icon={<Award className="w-8 h-8 text-purple-600" />}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;