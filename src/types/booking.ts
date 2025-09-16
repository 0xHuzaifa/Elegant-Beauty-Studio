export interface BookingService {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  isPopular?: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  date: Date;
  serviceId?: string;
}

export interface Booking {
  id: string;
  date: Date;
  time: string;
  service: BookingService;
  customerInfo: CustomerInfo;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  totalPrice: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface CalendarDay {
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
  availableSlots: number;
  hasBookings: boolean;
}

export interface BookingStep {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
}

export type BookingFlow = 'service' | 'date' | 'time' | 'details' | 'confirmation';

export interface BookingState {
  currentStep: BookingFlow;
  selectedService: BookingService | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  customerInfo: Partial<CustomerInfo>;
  isLoading: boolean;
  error: string | null;
}