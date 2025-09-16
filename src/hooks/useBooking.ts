import { useState, useCallback } from 'react';
import { BookingState, BookingService, CustomerInfo, BookingFlow } from '@/types/booking';

const initialBookingState: BookingState = {
  currentStep: 'service',
  selectedService: null,
  selectedDate: null,
  selectedTime: null,
  customerInfo: {},
  isLoading: false,
  error: null,
};

export const useBooking = () => {
  const [bookingState, setBookingState] = useState<BookingState>(initialBookingState);

  const updateStep = useCallback((step: BookingFlow) => {
    setBookingState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const selectService = useCallback((service: BookingService) => {
    setBookingState(prev => ({ 
      ...prev, 
      selectedService: service,
      currentStep: 'date' 
    }));
  }, []);

  const selectDate = useCallback((date: Date) => {
    setBookingState(prev => ({ 
      ...prev, 
      selectedDate: date,
      selectedTime: null, // Reset time when date changes
      currentStep: 'time' 
    }));
  }, []);

  const selectTime = useCallback((time: string) => {
    setBookingState(prev => ({ 
      ...prev, 
      selectedTime: time,
      currentStep: 'details' 
    }));
  }, []);

  const updateCustomerInfo = useCallback((info: Partial<CustomerInfo>) => {
    setBookingState(prev => ({ 
      ...prev, 
      customerInfo: { ...prev.customerInfo, ...info } 
    }));
  }, []);

  const confirmBooking = useCallback(async () => {
    setBookingState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBookingState(prev => ({ 
        ...prev, 
        isLoading: false,
        currentStep: 'confirmation' 
      }));
    } catch (error) {
      setBookingState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'Failed to confirm booking. Please try again.' 
      }));
    }
  }, []);

  const resetBooking = useCallback(() => {
    setBookingState(initialBookingState);
  }, []);

  const goBack = useCallback(() => {
    setBookingState(prev => {
      const stepOrder: BookingFlow[] = ['service', 'date', 'time', 'details', 'confirmation'];
      const currentIndex = stepOrder.indexOf(prev.currentStep);
      const previousStep = currentIndex > 0 ? stepOrder[currentIndex - 1] : 'service';
      
      return { ...prev, currentStep: previousStep };
    });
  }, []);

  const canProceed = useCallback((step: BookingFlow): boolean => {
    switch (step) {
      case 'service':
        return !!bookingState.selectedService;
      case 'date':
        return !!bookingState.selectedDate;
      case 'time':
        return !!bookingState.selectedTime;
      case 'details':
        const { firstName, lastName, email, phone } = bookingState.customerInfo;
        return !!(firstName && lastName && email && phone);
      default:
        return true;
    }
  }, [bookingState]);

  return {
    bookingState,
    updateStep,
    selectService,
    selectDate,
    selectTime,
    updateCustomerInfo,
    confirmBooking,
    resetBooking,
    goBack,
    canProceed,
  };
};