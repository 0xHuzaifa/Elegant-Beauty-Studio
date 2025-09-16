import { TimeSlot } from '@/types/booking';
import { format, addMinutes, startOfDay, isAfter, isBefore, parseISO } from 'date-fns';

// Business hours configuration
const BUSINESS_HOURS = {
  start: 9, // 9 AM
  end: 18,  // 6 PM
  slotDuration: 30, // 30 minutes
  breakStart: 12, // 12 PM
  breakEnd: 13,   // 1 PM
};

// Mock booked slots - in a real app this would come from an API
const mockBookedSlots = new Set([
  '2024-09-15T10:00:00.000Z',
  '2024-09-15T14:30:00.000Z',
  '2024-09-16T11:00:00.000Z',
  '2024-09-16T15:30:00.000Z',
  '2024-09-17T10:30:00.000Z',
  '2024-09-18T16:00:00.000Z',
]);

export const generateTimeSlots = (date: Date, serviceDuration: number = 60): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startOfBusinessDay = startOfDay(date);
  startOfBusinessDay.setHours(BUSINESS_HOURS.start, 0, 0, 0);

  let currentTime = new Date(startOfBusinessDay);
  const endOfBusinessDay = new Date(startOfBusinessDay);
  endOfBusinessDay.setHours(BUSINESS_HOURS.end, 0, 0, 0);

  const breakStart = new Date(startOfBusinessDay);
  breakStart.setHours(BUSINESS_HOURS.breakStart, 0, 0, 0);
  
  const breakEnd = new Date(startOfBusinessDay);
  breakEnd.setHours(BUSINESS_HOURS.breakEnd, 0, 0, 0);

  while (isBefore(currentTime, endOfBusinessDay)) {
    const slotEnd = addMinutes(currentTime, serviceDuration);
    
    // Skip if slot would extend past business hours
    if (isAfter(slotEnd, endOfBusinessDay)) {
      break;
    }

    // Skip lunch break slots
    const isInBreakTime = 
      (isAfter(currentTime, breakStart) || currentTime.getTime() === breakStart.getTime()) &&
      isBefore(currentTime, breakEnd);

    if (!isInBreakTime) {
      const slotId = `${format(date, 'yyyy-MM-dd')}_${format(currentTime, 'HH:mm')}`;
      const slotKey = currentTime.toISOString();
      
      slots.push({
        id: slotId,
        time: format(currentTime, 'HH:mm'),
        available: !mockBookedSlots.has(slotKey),
        date: new Date(currentTime),
        serviceId: undefined,
      });
    }

    currentTime = addMinutes(currentTime, BUSINESS_HOURS.slotDuration);
  }

  return slots;
};

export const formatTimeSlot = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const getAvailableSlotsCount = (date: Date, serviceDuration: number = 60): number => {
  const slots = generateTimeSlots(date, serviceDuration);
  return slots.filter(slot => slot.available).length;
};

export const isSlotAvailable = (date: Date, time: string): boolean => {
  const slotDateTime = new Date(date);
  const [hours, minutes] = time.split(':').map(Number);
  slotDateTime.setHours(hours, minutes, 0, 0);
  
  return !mockBookedSlots.has(slotDateTime.toISOString());
};