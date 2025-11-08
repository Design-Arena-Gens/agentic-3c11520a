'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingFormData, Booking, TimeSlot } from '@/types/booking';

const timeSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: false },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: true },
  { time: '5:00 PM', available: true },
];

export default function Dashboard() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: null,
    time: '',
    meetingType: 'online',
    notes: '',
  });

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.time || !formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      meetingType: formData.meetingType,
      notes: formData.notes,
      createdAt: new Date(),
    };

    setBookings([...bookings, newBooking]);
    setShowSuccess(true);

    setFormData({
      name: '',
      email: '',
      phone: '',
      date: null,
      time: '',
      meetingType: 'online',
      notes: '',
    });

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const selectDate = (day: number) => {
    const selected = new Date(year, month, day);
    setSelectedDate(selected);
    setFormData({ ...formData, date: selected });
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer">
                EstateHub
              </span>
            </Link>
            <Link href="/">
              <button className="text-slate-300 hover:text-white transition">
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"
          >
            Booking Dashboard
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800 rounded-2xl p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Schedule a Meeting</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-2 font-semibold">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 font-semibold">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">Meeting Type *</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, meetingType: 'online' })}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        formData.meetingType === 'online'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      🌐 Online
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, meetingType: 'offline' })}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        formData.meetingType === 'offline'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      🏢 In-Person
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">Selected Date *</label>
                  <div className="px-4 py-3 bg-slate-700 text-white rounded-lg">
                    {formData.date ? formData.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Please select a date from the calendar'}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">Time Slot *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setFormData({ ...formData, time: slot.time })}
                        className={`py-2 px-3 rounded-lg font-semibold transition-all duration-300 ${
                          !slot.available
                            ? 'bg-slate-900 text-slate-600 cursor-not-allowed'
                            : formData.time === slot.time
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">Additional Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
                    rows={3}
                    placeholder="Any specific requirements or questions?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  Book Appointment
                </button>
              </form>

              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 bg-green-500 text-white px-4 py-3 rounded-lg text-center font-semibold"
                  >
                    ✓ Booking confirmed successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800 rounded-2xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                  <span className="text-2xl text-white">←</span>
                </button>
                <h2 className="text-2xl font-bold text-white">
                  {monthNames[month]} {year}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                  <span className="text-2xl text-white">→</span>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-slate-400 font-semibold py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const date = new Date(year, month, day);
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  const isToday = new Date().toDateString() === date.toDateString();
                  const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                  return (
                    <motion.button
                      key={day}
                      whileHover={{ scale: isPast ? 1 : 1.1 }}
                      whileTap={{ scale: isPast ? 1 : 0.95 }}
                      onClick={() => !isPast && selectDate(day)}
                      disabled={isPast}
                      className={`aspect-square rounded-lg font-semibold transition-all duration-300 ${
                        isPast
                          ? 'bg-slate-900 text-slate-600 cursor-not-allowed'
                          : isSelected
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : isToday
                          ? 'bg-blue-500/20 text-blue-400 border-2 border-blue-500'
                          : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                    >
                      {day}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-slate-700 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Legend</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500/20 border-2 border-blue-500 rounded" />
                    <span className="text-slate-300">Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded" />
                    <span className="text-slate-300">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-900 rounded" />
                    <span className="text-slate-300">Unavailable</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bookings List */}
          {bookings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 bg-slate-800 rounded-2xl p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Your Appointments</h2>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-700 p-6 rounded-xl"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{booking.name}</h3>
                        <p className="text-slate-300">{booking.email}</p>
                        {booking.phone && <p className="text-slate-400">{booking.phone}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 font-semibold">
                          {booking.date.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-white font-bold">{booking.time}</p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.meetingType === 'online'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {booking.meetingType === 'online' ? '🌐 Online' : '🏢 In-Person'}
                        </span>
                      </div>
                    </div>
                    {booking.notes && (
                      <p className="mt-4 text-slate-400 italic border-t border-slate-600 pt-4">
                        "{booking.notes}"
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
