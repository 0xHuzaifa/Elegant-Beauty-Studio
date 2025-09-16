import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MessageSquare, Calendar, Clock, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { formatTimeSlot } from '@/utils/timeSlots';
import { CustomerInfo, BookingService } from '@/types/booking';

const customerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  notes: z.string().optional(),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerDetailsProps {
  customerInfo: Partial<CustomerInfo>;
  selectedService: BookingService;
  selectedDate: Date;
  selectedTime: string;
  onCustomerInfoUpdate: (info: Partial<CustomerInfo>) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customerInfo,
  selectedService,
  selectedDate,
  selectedTime,
  onCustomerInfoUpdate,
  onConfirm,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: customerInfo,
    mode: 'onChange',
  });

  // Watch form data and update parent
  const formData = watch();
  React.useEffect(() => {
    onCustomerInfoUpdate(formData);
  }, [formData, onCustomerInfoUpdate]);

  const onSubmit = (data: CustomerFormData) => {
    onCustomerInfoUpdate(data);
    onConfirm();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Details
        </h2>
        <p className="text-lg text-muted-foreground">
          Please provide your contact information to complete the booking.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Summary */}
        <Card className="shadow-medium h-fit">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              📋 Booking Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Service */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />
                Service
              </div>
              <div className="pl-6">
                <h3 className="font-semibold text-lg">{selectedService.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedService.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {selectedService.duration} min
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <DollarSign className="h-3 w-3" />
                    ${selectedService.price}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Date & Time */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Date & Time
              </div>
              <div className="pl-6 space-y-1">
                <p className="font-semibold">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                <p className="text-lg font-bold text-primary">{formatTimeSlot(selectedTime)}</p>
                <p className="text-sm text-muted-foreground">
                  Appointment ends at {formatTimeSlot(
                    `${parseInt(selectedTime.split(':')[0]) + Math.floor(selectedService.duration / 60)}:${
                      (parseInt(selectedTime.split(':')[1]) + (selectedService.duration % 60)).toString().padStart(2, '0')
                    }`
                  )}
                </p>
              </div>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">${selectedService.price}</span>
            </div>
          </CardContent>
        </Card>

        {/* Customer Form */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              👤 Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    placeholder="Enter your first name"
                    className={errors.firstName ? 'border-destructive' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    placeholder="Enter your last name"
                    className={errors.lastName ? 'border-destructive' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="your@email.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    We'll send your booking confirmation here
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    placeholder="(555) 123-4567"
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    For booking reminders and updates
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Special Requests (Optional)
                </Label>
                <Textarea
                  id="notes"
                  {...register('notes')}
                  placeholder="Any special requests or information we should know..."
                  rows={3}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Let us know about any allergies, preferences, or special needs
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-gradient-primary hover:shadow-glow"
                disabled={!isValid || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Confirming Booking...
                  </div>
                ) : (
                  'Confirm Booking'
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By booking, you agree to our terms of service and cancellation policy.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};