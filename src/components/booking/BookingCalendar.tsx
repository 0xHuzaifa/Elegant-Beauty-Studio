import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay, addMonths, subMonths, isAfter, startOfDay } from 'date-fns';
import { getAvailableSlotsCount } from '@/utils/timeSlots';
import { cn } from '@/lib/utils';

interface BookingCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  serviceDuration?: number;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedDate,
  onDateSelect,
  serviceDuration = 60,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const today = startOfDay(new Date());

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  const getDayInfo = (date: Date) => {
    const availableSlots = getAvailableSlotsCount(date, serviceDuration);
    const isPastDate = !isAfter(date, today) && !isSameDay(date, today);
    
    return {
      availableSlots,
      isPastDate,
      isSelectable: !isPastDate && availableSlots > 0,
    };
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Select Your Date</h2>
        <p className="text-lg text-muted-foreground">
          Choose your preferred date for the appointment. Available time slots are shown for each day.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-primary" />
              {format(currentMonth, 'MMMM yyyy')}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="h-10 w-10 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="h-10 w-10 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month start */}
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-${index}`} className="h-20" />
            ))}

            {/* Month days */}
            {daysInMonth.map((date) => {
              const dayInfo = getDayInfo(date);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const todayCheck = isToday(date);

              return (
                <div
                  key={date.toISOString()}
                  className={cn(
                    'h-20 p-2 border rounded-lg cursor-pointer transition-all duration-200',
                    'hover:shadow-medium hover:scale-105',
                    {
                      'bg-primary text-primary-foreground shadow-glow': isSelected,
                      'bg-muted/50 cursor-not-allowed': !dayInfo.isSelectable,
                      'ring-2 ring-primary ring-offset-2': todayCheck && !isSelected,
                      'hover:bg-accent hover:text-accent-foreground': dayInfo.isSelectable && !isSelected,
                    }
                  )}
                  onClick={() => dayInfo.isSelectable && onDateSelect(date)}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div className="text-right">
                      <span className={cn(
                        'text-sm font-medium',
                        todayCheck && !isSelected && 'font-bold'
                      )}>
                        {format(date, 'd')}
                      </span>
                    </div>
                    
                    <div className="text-center">
                      {dayInfo.isSelectable ? (
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            'text-xs px-2 py-1',
                            isSelected && 'bg-primary-foreground text-primary'
                          )}
                        >
                          {dayInfo.availableSlots} slots
                        </Badge>
                      ) : dayInfo.isPastDate ? (
                        <span className="text-xs text-muted-foreground">Past</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Full</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent/20 border-2 border-primary rounded-full"></div>
              <span>Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-success-light rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted rounded-full"></div>
              <span>Unavailable</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};