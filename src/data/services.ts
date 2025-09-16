import { BookingService } from "@/types/booking";

export const bookingServices: BookingService[] = [
  {
    id: "haircut-consultation",
    name: "Hair Consultation & Cut",
    description: "Professional hair consultation with a precision cut tailored to your style and face shape.",
    duration: 60,
    price: 85,
    category: "Hair",
    isPopular: true,
  },
  {
    id: "color-treatment",
    name: "Color Treatment",
    description: "Full color service including consultation, application, and styling. Transform your look with expert color techniques.",
    duration: 120,
    price: 150,
    category: "Hair",
    isPopular: true,
  },
  {
    id: "deep-conditioning",
    name: "Deep Conditioning Treatment",
    description: "Restore and nourish your hair with our signature deep conditioning treatment for damaged or dry hair.",
    duration: 45,
    price: 65,
    category: "Hair",
  },
  {
    id: "facial-classic",
    name: "Classic European Facial",
    description: "A rejuvenating facial treatment that cleanses, exfoliates, and hydrates your skin for a radiant glow.",
    duration: 75,
    price: 95,
    category: "Skincare",
    isPopular: true,
  },
  {
    id: "anti-aging-facial",
    name: "Anti-Aging Facial",
    description: "Advanced anti-aging treatment with peptides and serums to reduce fine lines and improve skin texture.",
    duration: 90,
    price: 140,
    category: "Skincare",
  },
  {
    id: "manicure-gel",
    name: "Gel Manicure",
    description: "Long-lasting gel manicure with nail shaping, cuticle care, and professional gel polish application.",
    duration: 50,
    price: 55,
    category: "Nails",
  },
  {
    id: "pedicure-spa",
    name: "Spa Pedicure",
    description: "Luxurious pedicure experience with exfoliation, massage, and polish for healthy, beautiful feet.",
    duration: 60,
    price: 70,
    category: "Nails",
  },
  {
    id: "massage-swedish",
    name: "Swedish Massage",
    description: "Relaxing full-body massage to relieve tension, improve circulation, and promote deep relaxation.",
    duration: 60,
    price: 110,
    category: "Wellness",
  },
  {
    id: "massage-deep-tissue",
    name: "Deep Tissue Massage",
    description: "Therapeutic massage targeting deeper muscle layers to address chronic tension and muscle knots.",
    duration: 75,
    price: 135,
    category: "Wellness",
  }
];

export const serviceCategories = [
  { id: "Hair", name: "Hair Services", icon: "Scissors" },
  { id: "Skincare", name: "Skincare", icon: "Sparkles" },
  { id: "Nails", name: "Nail Care", icon: "Hand" },
  { id: "Wellness", name: "Wellness", icon: "Leaf" },
];