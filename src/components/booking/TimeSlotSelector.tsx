import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { generateTimeSlots, formatTimeSlot } from '@/utils/timeSlots';
import { BookingService } from '@/types/booking';
import { cn } from '@/lib/utils';

interface TimeSlotSelectorProps {
  selectedDate: Date;
  selectedTime: string | null;
  selectedService: BookingService;
  onTimeSelect: (time: string) => void;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedDate,
  selectedTime,
  selectedService,
  onTimeSelect,
}) => {
  const timeSlots = generateTimeSlots(selectedDate, selectedService.duration);
  const availableSlots = timeSlots.filter(slot => slot.available);
  const bookedSlots = timeSlots.filter(slot => !slot.available);

  const morningSlots = availableSlots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return hour < 12;
  });

  const afternoonSlots = availableSlots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return hour >= 12;
  });

  const SlotButton: React.FC<{ time: string; available: boolean }> = ({ time, available }) => (
    <Button
      key={time}
      variant="outline"
      className={cn(
        'h-12 text-sm font-medium transition-all duration-200',
        'hover:scale-105 hover:shadow-medium',
        {
          'bg-primary text-primary-foreground shadow-glow hover:bg-primary-hover': selectedTime === time,
          'hover:bg-accent hover:text-accent-foreground': available && selectedTime !== time,
          'bg-muted text-muted-foreground cursor-not-allowed opacity-50': !available,
        }
      )}
      onClick={() => available && onTimeSelect(time)}
      disabled={!available}
    >
      <Clock className="h-4 w-4 mr-2" />
      {formatTimeSlot(time)}
      {selectedTime === time && <CheckCircle className="h-4 w-4 ml-2" />}
    </Button>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Select Your Time
        </h2>
        <div className="space-y-2">
          <p className="text-lg text-muted-foreground">
            Choose your preferred time slot for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="outline" className="gap-2">
              <Clock className="h-3 w-3" />
              Duration: {selectedService.duration} minutes
            </Badge>
            <Badge variant="outline">
              Service: {selectedService.name}
            </Badge>
          </div>
        </div>
      </div>

      {availableSlots.length === 0 ? (
        <Card className="max-w-2xl mx-auto shadow-medium">
          <CardContent className="py-12 text-center">
            <div className="space-y-4">
              <div className="text-4xl">😔</div>
              <h3 className="text-xl font-semibold">No Available Slots</h3>
              <p className="text-muted-foreground">
                Unfortunately, there are no available time slots for this date. 
                Please select a different date.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Morning Slots */}
          {morningSlots.length > 0 && (
            <Card className="shadow-medium">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  🌅 Morning Slots
                  <Badge variant="secondary">{morningSlots.length} available</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {morningSlots.map(slot => (
                    <SlotButton key={slot.id} time={slot.time} available={slot.available} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Afternoon Slots */}
          {afternoonSlots.length > 0 && (
            <Card className="shadow-medium">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  ☀️ Afternoon Slots
                  <Badge variant="secondary">{afternoonSlots.length} available</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {afternoonSlots.map(slot => (
                    <SlotButton key={slot.id} time={slot.time} available={slot.available} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Booked Slots Info */}
          {bookedSlots.length > 0 && (
            <Card className="shadow-soft border-muted">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-muted-foreground flex items-center gap-2">
                  🔒 Unavailable Slots
                  <Badge variant="outline">{bookedSlots.length} booked</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {bookedSlots.map(slot => (
                    <Button
                      key={slot.id}
                      variant="outline"
                      size="sm"
                      className="text-xs cursor-not-allowed opacity-50"
                      disabled
                    >
                      {formatTimeSlot(slot.time)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Summary */}
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <Separator />
            <p>
              Showing {availableSlots.length} available slots out of {timeSlots.length} total slots
            </p>
            <p className="text-xs">
              All times are displayed in your local timezone
            </p>
          </div>
        </div>
      )}
    </div>
  );
};