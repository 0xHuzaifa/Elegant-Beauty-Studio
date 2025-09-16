import React from 'react';
import { BookingService } from '@/types/booking';
import { bookingServices, serviceCategories } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, Star, Scissors, Sparkles, Hand, Leaf } from 'lucide-react';

interface ServiceSelectorProps {
  selectedService: BookingService | null;
  onServiceSelect: (service: BookingService) => void;
}

const categoryIcons = {
  Scissors,
  Sparkles,
  Hand,
  Leaf,
};

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  selectedService,
  onServiceSelect,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredServices = selectedCategory === 'all' 
    ? bookingServices 
    : bookingServices.filter(service => service.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">Choose Your Service</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select from our range of professional services designed to help you look and feel your best.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
          className="min-w-[100px]"
        >
          All Services
        </Button>
        {serviceCategories.map((category) => {
          const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons];
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="min-w-[120px] gap-2"
            >
              <IconComponent className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className={`cursor-pointer transition-all duration-300 hover-lift hover:shadow-glow relative ${
              selectedService?.id === service.id
                ? 'ring-2 ring-primary shadow-glow'
                : 'hover:shadow-medium'
            }`}
            onClick={() => onServiceSelect(service)}
          >
            {service.isPopular && (
              <Badge className="absolute -top-2 -right-2 bg-gradient-primary text-primary-foreground gap-1">
                <Star className="h-3 w-3 fill-current" />
                Popular
              </Badge>
            )}
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl font-semibold leading-tight">
                  {service.name}
                </CardTitle>
              </div>
              <CardDescription className="text-sm leading-relaxed">
                {service.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>${service.price}</span>
                </div>
              </div>
              
              <Button
                className="w-full"
                variant={selectedService?.id === service.id ? 'default' : 'outline'}
              >
                {selectedService?.id === service.id ? 'Selected' : 'Select Service'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No services found in this category.</p>
        </div>
      )}
    </div>
  );
};