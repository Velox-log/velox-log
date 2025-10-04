"use client";
import { useState } from "react";
import { ArrowRight, Play, Shield, Clock, MapPin } from "lucide-react";
import { motion, easeOut } from "framer-motion"; // ✅ added easeOut import
import VideoModal from "../VideoModal";

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoUrl = "https://www.youtube.com/embed//heGJcaPUSz8?autoplay=1";

  const Stats = [
    {
      span: "24/7",
      label: "Real-time Tracking",
      icon: <Clock className="w-8 h-8 text-secondary mx-auto mb-4" />,
    },
    {
      span: "200+",
      label: "Global Locations",
      icon: <MapPin className="w-8 h-8 text-secondary mx-auto mb-4" />,
    },
    {
      span: "99.9%",
      label: "Delivery Success",
      icon: <Shield className="w-8 h-8 text-secondary mx-auto mb-4" />,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }, // ✅ fixed
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: easeOut }, // ✅ fixed
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(30,64,175,0.7), rgba(30,64,175,0.5)), url('/plane2.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary/50"></div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-4 px-4 mb-8"
          >
            <Shield className="w-6 h-6" />
            <span className="text-sm font-medium">
              Trusted by 10,000+ businesses worldwide
            </span>
          </motion.div>

          {/* main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            Fast, Reliable
            <span className="block text-secondary">Logistics Solutions</span>
          </motion.h1>

          {/* sub heading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
          >
            From local deliveries to global shipping, we move your business
            forward with speed, security, and precision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          >
            <motion.a
              href="/quote"
              className="bg-secondary hover:bg-secondary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.button
              onClick={() => setShowVideo(true)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Stats/Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {Stats.map((item, index) => (
              <motion.div
                key={index}
                variants={statVariants}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                  }}
                >
                  {item.icon}
                </motion.div>
                <motion.div
                  className="text-2xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {item.span}
                </motion.div>
                <motion.div
                  className="text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {item.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <VideoModal
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        videoUrl={videoUrl}
      />
    </section>
  );
};

export default Hero;
