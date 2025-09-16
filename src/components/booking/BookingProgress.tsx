import React from 'react';
import { CheckCircle, Circle, Clock, User, Calendar, Briefcase } from 'lucide-react';
import { BookingFlow } from '@/types/booking';
import { cn } from '@/lib/utils';

interface BookingProgressProps {
  currentStep: BookingFlow;
  completedSteps: BookingFlow[];
}

const steps = [
  {
    id: 'service' as BookingFlow,
    title: 'Service',
    description: 'Choose service',
    icon: Briefcase,
  },
  {
    id: 'date' as BookingFlow,
    title: 'Date',
    description: 'Pick a date',
    icon: Calendar,
  },
  {
    id: 'time' as BookingFlow,
    title: 'Time',
    description: 'Select time',
    icon: Clock,
  },
  {
    id: 'details' as BookingFlow,
    title: 'Details',
    description: 'Your information',
    icon: User,
  },
  {
    id: 'confirmation' as BookingFlow,
    title: 'Confirmation',
    description: 'Review & confirm',
    icon: CheckCircle,
  },
];

export const BookingProgress: React.FC<BookingProgressProps> = ({
  currentStep,
  completedSteps,
}) => {
  const getStepStatus = (step: BookingFlow) => {
    if (completedSteps.includes(step)) return 'completed';
    if (step === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress Bar Background */}
          <div className="absolute top-6 left-0 w-full h-1 bg-muted rounded-full z-0" />
          
          {/* Active Progress Bar */}
          <div 
            className="absolute top-6 left-0 h-1 bg-gradient-primary rounded-full z-10 transition-all duration-500"
            style={{
              width: `${(completedSteps.length / (steps.length - 1)) * 100}%`
            }}
          />

          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const IconComponent = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center relative z-20">
                {/* Step Circle */}
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300',
                    'border-2 shadow-soft',
                    {
                      'bg-primary border-primary text-primary-foreground shadow-glow': status === 'completed',
                      'bg-background border-primary text-primary ring-4 ring-primary/20': status === 'current',
                      'bg-background border-muted text-muted-foreground': status === 'upcoming',
                    }
                  )}
                >
                  {status === 'completed' ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <IconComponent className={cn(
                      'h-5 w-5',
                      status === 'current' && 'animate-pulse'
                    )} />
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <div className={cn(
                    'text-sm font-medium transition-colors',
                    {
                      'text-primary': status === 'completed' || status === 'current',
                      'text-muted-foreground': status === 'upcoming',
                    }
                  )}>
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Indicator */}
        <div className="mt-6 sm:hidden">
          <div className="text-center text-sm text-muted-foreground">
            Step {steps.findIndex(s => s.id === currentStep) + 1} of {steps.length}
          </div>
        </div>
      </div>
    </div>
  );
};