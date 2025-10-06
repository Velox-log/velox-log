// components/Footer.tsx
import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Shield,
  Award,
  Globe
} from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Services',
      links: [
        { label: 'Ground Shipping', href: '/services/ground-shipping' },
        { label: 'Air Freight', href: '/services/air-freight' },
        { label: 'Ocean Freight', href: '/services/ocean-freight' },
        { label: 'Warehousing', href: '/services/warehousing' },
        { label: 'Express Delivery', href: '/services/express-delivery' },
        { label: 'Global Logistics', href: '/services/global-logistics' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Story', href: '/story' },
        { label: 'Leadership', href: '/leadership' },
        { label: 'Careers', href: '/careers' },
        { label: 'News & Media', href: '/news' },
        { label: 'Locations', href: '/locations' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Track Package', href: '/track' },
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Customer Portal', href: '/portal' },
        { label: 'Shipping Guide', href: '/guide' },
        { label: 'API Documentation', href: '/api-docs' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Industry Insights', href: '/insights' },
        { label: 'White Papers', href: '/whitepapers' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Webinars', href: '/webinars' },
        { label: 'Blog', href: '/blog' },
        { label: 'Downloads', href: '/downloads' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/logiflow', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/logiflow', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/logiflow', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com/company/logiflow', label: 'LinkedIn' },
    { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com/logiflow', label: 'YouTube' }
  ];

  const certifications = [
    { icon: <Shield className="w-6 h-6" />, label: 'ISO 9001 Certified' },
    { icon: <Award className="w-6 h-6" />, label: 'C-TPAT Member' },
    { icon: <Globe className="w-6 h-6" />, label: 'Carbon Neutral' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-400 text-lg">
                Get the latest logistics insights, industry updates, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white placeholder-gray-400"
                  />
                </div>
                <button className="bg-secondary hover:bg-secondary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">

          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary p-2 rounded-lg">
                Velox<span className="text-secondary">logistics</span>
              </div>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted logistics partner for fast, reliable, and secure shipping solutions.
              Moving your business forward with excellence in every delivery.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-gray-300">+447 (853) 756-734</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="text-gray-300">info@Veloxlogistics0@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <span className="text-gray-300">
                  <strong>Head Office (UK):</strong><br />
                  45 Bishopsgate, London EC2N 4AH,<br />
                  United Kingdom
                  <br /><br />
                  <strong>Branch Office (US):</strong><br />
                  123 Logistics Ave<br />
                  Business District<br />
                  New York, NY 10001
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-secondary" />
                <span className="text-gray-300">24/7 Customer Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="bg-gray-800 hover:bg-secondary p-3 rounded-lg transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="border-t border-gray-800 pt-12 mt-16">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold mb-6">Certifications & Compliance</h4>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-400">
                  {cert.icon}
                  <span>{cert.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Veloxlogistics. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="/security" className="text-gray-400 hover:text-white transition-colors">
                Security
              </a>
              <a href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;