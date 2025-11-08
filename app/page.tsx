'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                EstateHub
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#properties" className="text-slate-300 hover:text-white transition">Properties</a>
              <a href="#about" className="text-slate-300 hover:text-white transition">About</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
            </div>
            <Link href="/dashboard">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Discover luxury properties in prime locations. Your perfect home awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  Book a Viewing
                </button>
              </Link>
              <button className="bg-slate-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-700 transition-all duration-300 border border-slate-600">
                Explore Properties
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Properties</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Modern Villa',
                price: '$2,500,000',
                location: 'Beverly Hills, CA',
                beds: 4,
                baths: 3,
                sqft: '3,500',
                image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'
              },
              {
                title: 'Luxury Penthouse',
                price: '$3,200,000',
                location: 'Manhattan, NY',
                beds: 3,
                baths: 2,
                sqft: '2,800',
                image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
              },
              {
                title: 'Oceanfront Estate',
                price: '$4,800,000',
                location: 'Malibu, CA',
                beds: 5,
                baths: 4,
                sqft: '5,200',
                image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'
              }
            ].map((property, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${property.image})` }} />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{property.title}</h3>
                  <p className="text-slate-400 mb-4">{property.location}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-bold text-blue-400">{property.price}</span>
                  </div>
                  <div className="flex gap-4 text-slate-300 mb-4">
                    <span>{property.beds} beds</span>
                    <span>•</span>
                    <span>{property.baths} baths</span>
                    <span>•</span>
                    <span>{property.sqft} sqft</span>
                  </div>
                  <Link href="/dashboard">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                      Schedule Tour
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Why Choose EstateHub?</h2>
              <p className="text-slate-300 text-lg mb-6">
                With over 20 years of experience in luxury real estate, we provide unparalleled service
                and access to the most exclusive properties worldwide.
              </p>
              <div className="space-y-4">
                {['Expert Market Knowledge', 'Personalized Service', 'Premium Property Selection', 'Seamless Transactions'].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 p-8 rounded-xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <p className="text-slate-300 mb-6">
                Book a consultation with our experts and let us help you find your dream property.
              </p>
              <Link href="/dashboard">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Book Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Have questions? Our team is here to help you find the perfect property.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="text-blue-400 text-2xl mb-2">📧</div>
              <p className="text-white font-semibold">Email</p>
              <p className="text-slate-400">contact@estatehub.com</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="text-blue-400 text-2xl mb-2">📞</div>
              <p className="text-white font-semibold">Phone</p>
              <p className="text-slate-400">+1 (555) 123-4567</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="text-blue-400 text-2xl mb-2">📍</div>
              <p className="text-white font-semibold">Office</p>
              <p className="text-slate-400">123 Luxury Ave, NYC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; 2024 EstateHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
