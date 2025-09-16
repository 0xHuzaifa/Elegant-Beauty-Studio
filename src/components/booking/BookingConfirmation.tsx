import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Share2, 
  Download,
  Home,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';
import { formatTimeSlot } from '@/utils/timeSlots';
import { BookingService, CustomerInfo } from '@/types/booking';

interface BookingConfirmationProps {
  selectedService: BookingService;
  selectedDate: Date;
  selectedTime: string;
  customerInfo: Partial<CustomerInfo>;
  onNewBooking: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  selectedService,
  selectedDate,
  selectedTime,
  customerInfo,
  onNewBooking,
}) => {
  const bookingId = `BK-${Date.now().toString().slice(-6)}`;
  const bookingDate = new Date();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Booking Confirmation',
        text: `Booking confirmed for ${selectedService.name} on ${format(selectedDate, 'MMM d, yyyy')} at ${formatTimeSlot(selectedTime)}`,
      });
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert('Download functionality would be implemented here');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Success Header */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-scale-in">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-muted-foreground">
            Your appointment has been successfully scheduled
          </p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Booking ID: {bookingId}
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Booking Details Card */}
        <Card className="shadow-strong bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              📅 Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Service Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <User className="h-5 w-5" />
                <span>Service</span>
              </div>
              <div className="ml-7 space-y-2">
                <h3 className="text-xl font-bold">{selectedService.name}</h3>
                <p className="text-muted-foreground">{selectedService.description}</p>
                <div className="flex gap-3">
                  <Badge className="gap-1">
                    <Clock className="h-3 w-3" />
                    {selectedService.duration} minutes
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    ${selectedService.price}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Date and Time */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <Calendar className="h-5 w-5" />
                <span>Date & Time</span>
              </div>
              <div className="ml-7 space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </div>
                <div className="text-xl font-semibold">
                  {formatTimeSlot(selectedTime)} - {formatTimeSlot(
                    `${parseInt(selectedTime.split(':')[0]) + Math.floor(selectedService.duration / 60)}:${
                      (parseInt(selectedTime.split(':')[1]) + (selectedService.duration % 60)).toString().padStart(2, '0')
                    }`
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Please arrive 10 minutes early for check-in
                </p>
              </div>
            </div>

            <Separator />

            {/* Location */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <MapPin className="h-5 w-5" />
                <span>Location</span>
              </div>
              <div className="ml-7">
                <p className="font-semibold">Elegant Beauty Studio</p>
                <p className="text-muted-foreground">123 Main Street, Suite 200</p>
                <p className="text-muted-foreground">New York, NY 10001</p>
                <p className="text-sm text-primary mt-1">Free parking available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              👤 Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p><strong>Name:</strong> {customerInfo.firstName} {customerInfo.lastName}</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{customerInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customerInfo.phone}</span>
                </div>
              </div>
              {customerInfo.notes && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-medium">Special Requests:</span>
                  </div>
                  <p className="text-sm p-3 bg-muted rounded-lg">{customerInfo.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-medium border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">📧 Confirmation Email</h4>
                <p className="text-sm text-muted-foreground">
                  A detailed confirmation email has been sent to {customerInfo.email}
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">📱 Reminders</h4>
                <p className="text-sm text-muted-foreground">
                  We'll send you SMS reminders 24 hours and 1 hour before your appointment
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">🔄 Reschedule</h4>
                <p className="text-sm text-muted-foreground">
                  Need to reschedule? Contact us at least 24 hours in advance
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">❓ Questions</h4>
                <p className="text-sm text-muted-foreground">
                  Call us at (555) 123-4567 or email info@elegantbeauty.com
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleShare}
            variant="outline"
            className="gap-2 h-12"
          >
            <Share2 className="h-4 w-4" />
            Share Booking
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="gap-2 h-12"
          >
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
          <Button
            onClick={onNewBooking}
            className="gap-2 h-12 bg-gradient-primary hover:shadow-glow"
          >
            <Home className="h-4 w-4" />
            Book Another Appointment
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground border-t pt-6">
          <p>Thank you for choosing Elegant Beauty Studio!</p>
          <p className="mt-2">
            Booked on {format(bookingDate, 'PPP')} at {format(bookingDate, 'p')}
          </p>
        </div>
      </div>
    </div>
  );
};