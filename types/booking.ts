export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  meetingType: 'online' | 'offline';
  notes?: string;
  createdAt: Date;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: Date | null;
  time: string;
  meetingType: 'online' | 'offline';
  notes: string;
}
