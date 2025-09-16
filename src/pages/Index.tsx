import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingLayout } from "@/components/booking/BookingLayout";
import {
  Calendar,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Index = () => {
  const [showBooking, setShowBooking] = useState(false);

  if (showBooking) {
    return <BookingLayout onHome={() => setShowBooking(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4 animate-fade-in">
              <Badge className="px-4 py-2 text-sm bg-gradient-primary text-primary-foreground">
                <Sparkles className="h-4 w-4 mr-2" />
                Professional Beauty Services
              </Badge>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Beautiful
                </span>{" "}
                <span className="text-foreground">Appointments</span>
                <br />
                <span className="text-foreground">Made</span>{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Simple
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Book your perfect beauty appointment in just a few clicks.
                Professional services, convenient scheduling, and exceptional
                results await you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Button
                size="lg"
                className="h-14 px-8 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-300 gap-2"
                onClick={() => setShowBooking(true)}
              >
                Book Appointment Now
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg font-semibold"
              >
                View Services
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10,000+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Instant Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">
              Why Choose Our Booking System?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience seamless booking with features designed for your
              convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-medium hover-lift transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Calendar</CardTitle>
                <CardDescription>
                  Interactive calendar with real-time availability and easy date
                  selection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-medium hover-lift transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Flexible Scheduling</CardTitle>
                <CardDescription>
                  Choose from available time slots that fit your busy schedule
                  perfectly
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-medium hover-lift transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Instant Confirmation</CardTitle>
                <CardDescription>
                  Get immediate booking confirmation with email and SMS
                  reminders
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Our Premium Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our range of professional beauty and wellness services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Hair Services",
                count: "8 Services",
                color: "bg-blue-500",
              },
              { name: "Skincare", count: "5 Services", color: "bg-green-500" },
              {
                name: "Nail Care",
                count: "6 Services",
                color: "bg-purple-500",
              },
              { name: "Wellness", count: "4 Services", color: "bg-orange-500" },
            ].map((category, index) => (
              <Card
                key={index}
                className="shadow-medium hover-lift cursor-pointer transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 ${category.color} rounded-full mx-auto mb-4 flex items-center justify-center`}
                  >
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => setShowBooking(true)}
              className="h-12 px-8 bg-gradient-primary hover:shadow-glow gap-2"
            >
              Explore All Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold">Visit Our Studio</h2>
              <p className="text-xl text-muted-foreground">
                Located in the heart of the city, easily accessible by public
                transport
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location & Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Address</h4>
                    <p className="text-muted-foreground">
                      123 Main Street, Suite 200
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Business Hours</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 5:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">(555) 123-4567</p>
                      <p className="text-sm text-muted-foreground">
                        For bookings and inquiries
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">info@elegantbeauty.com</p>
                      <p className="text-sm text-muted-foreground">
                        General information
                      </p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button
                      className="w-full bg-gradient-primary hover:shadow-glow"
                      onClick={() => setShowBooking(true)}
                    >
                      Book Your Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EB</span>
              </div>
              <h3 className="text-xl font-bold">Elegant Beauty Studio</h3>
            </div>
            <p className="text-muted-foreground">
              Your trusted partner for professional beauty and wellness services
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <p className="text-black/50 cursor-default">Privacy Policy</p>
              <p className="text-black/50 cursor-default">Terms of Service</p>
              <p className="text-black/50 cursor-default">Contact Us</p>
            </div>
            <p className="text-sm text-muted-foreground/80 pt-4 border-t">
              © 2024 Elegant Beauty Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
