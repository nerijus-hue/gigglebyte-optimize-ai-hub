export interface Testimonial {
  id: string;
  name: string;
  company: string | null;
  position: string | null;
  message: string;
  rating: number | null;
  is_approved: boolean | null;
  created_at: string;
  updated_at: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "c396dc0c-6a42-4313-9417-1ba0fa4ce267",
    name: "Sarah Johnson",
    company: "TechFlow Solutions",
    position: "CEO",
    message: "Gigglebyte transformed our operations completely. Their AI integration reduced our processing time by 60% and saved us thousands in operational costs.",
    rating: 5,
    is_approved: true,
    created_at: "2025-09-04T15:33:41.016512+00:00",
    updated_at: "2025-09-04T15:33:41.016512+00:00"
  },
  {
    id: "4aec740d-2974-4ad9-af8e-5bd9567bec20",
    name: "Michael Chen",
    company: "GrowthCorp",
    position: "Operations Manager",
    message: "The automation workflows they built for us eliminated 80% of our manual data entry. Our team can now focus on strategic initiatives instead of repetitive tasks.",
    rating: 5,
    is_approved: true,
    created_at: "2025-09-04T15:33:41.016512+00:00",
    updated_at: "2025-09-04T15:33:41.016512+00:00"
  },
  {
    id: "066e8055-25ef-4efe-af59-dc62258436ef",
    name: "Emily Rodriguez",
    company: "StartupX",
    position: "Founder",
    message: "As a startup founder, I was drowning in admin work. Gigglebyte's solutions gave me back 15 hours per week to focus on growing my business.",
    rating: 5,
    is_approved: true,
    created_at: "2025-09-04T15:33:41.016512+00:00",
    updated_at: "2025-09-04T15:33:41.016512+00:00"
  }
];
