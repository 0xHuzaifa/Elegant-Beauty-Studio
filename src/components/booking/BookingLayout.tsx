import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";
import { BookingProgress } from "./BookingProgress";
import { ServiceSelector } from "./ServiceSelector";
import { BookingCalendar } from "./BookingCalendar";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { CustomerDetails } from "./CustomerDetails";
import { BookingConfirmation } from "./BookingConfirmation";
import { useBooking } from "@/hooks/useBooking";
import { useEffect } from "react";
import { BookingFlow } from "@/types/booking";

interface BookingLayoutProps {
  onHome?: () => void;
}

export const BookingLayout: React.FC<BookingLayoutProps> = ({ onHome }) => {
  const {
    bookingState,
    selectService,
    selectDate,
    selectTime,
    updateCustomerInfo,
    confirmBooking,
    resetBooking,
    goBack,
    canProceed,
  } = useBooking();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [bookingState.currentStep]);

  const getCompletedSteps = (): BookingFlow[] => {
    const completed: BookingFlow[] = [];
    if (bookingState.selectedService) completed.push("service");
    if (bookingState.selectedDate) completed.push("date");
    if (bookingState.selectedTime) completed.push("time");
    if (canProceed("details")) completed.push("details");
    return completed;
  };

  const handleNext = () => {
    const stepOrder: BookingFlow[] = [
      "service",
      "date",
      "time",
      "details",
      "confirmation",
    ];
    const currentIndex = stepOrder.indexOf(bookingState.currentStep);
    if (currentIndex < stepOrder.length - 1) {
      const nextStep = stepOrder[currentIndex + 1];
      // Use the booking hook's built-in navigation instead
    }
  };

  const renderCurrentStep = () => {
    switch (bookingState.currentStep) {
      case "service":
        return (
          <ServiceSelector
            selectedService={bookingState.selectedService}
            onServiceSelect={selectService}
          />
        );

      case "date":
        return (
          <BookingCalendar
            selectedDate={bookingState.selectedDate}
            onDateSelect={selectDate}
            serviceDuration={bookingState.selectedService?.duration}
          />
        );

      case "time":
        return bookingState.selectedDate && bookingState.selectedService ? (
          <TimeSlotSelector
            selectedDate={bookingState.selectedDate}
            selectedTime={bookingState.selectedTime}
            selectedService={bookingState.selectedService}
            onTimeSelect={selectTime}
          />
        ) : null;

      case "details":
        return bookingState.selectedService &&
          bookingState.selectedDate &&
          bookingState.selectedTime ? (
          <CustomerDetails
            customerInfo={bookingState.customerInfo}
            selectedService={bookingState.selectedService}
            selectedDate={bookingState.selectedDate}
            selectedTime={bookingState.selectedTime}
            onCustomerInfoUpdate={updateCustomerInfo}
            onConfirm={confirmBooking}
            isLoading={bookingState.isLoading}
          />
        ) : null;

      case "confirmation":
        return bookingState.selectedService &&
          bookingState.selectedDate &&
          bookingState.selectedTime ? (
          <BookingConfirmation
            selectedService={bookingState.selectedService}
            selectedDate={bookingState.selectedDate}
            selectedTime={bookingState.selectedTime}
            customerInfo={bookingState.customerInfo}
            onNewBooking={resetBooking}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              {bookingState.currentStep !== "service" &&
                bookingState.currentStep !== "confirmation" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goBack}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EB</span>
                </div>
                <h1 className="text-xl font-bold">Elegant Beauty</h1>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onHome || resetBooking}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {bookingState.currentStep !== "confirmation" && (
        <div className="border-b bg-background/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <BookingProgress
              currentStep={bookingState.currentStep}
              completedSteps={getCompletedSteps()}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookingState.error && (
          <Card className="mb-8 border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <p className="text-destructive text-center">
                {bookingState.error}
              </p>
            </CardContent>
          </Card>
        )}

        {renderCurrentStep()}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>© 2024 Elegant Beauty Studio. All rights reserved.</p>
            <div className="flex justify-center gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
