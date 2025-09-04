-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  position TEXT,
  message TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonials
-- Allow anyone to insert testimonials (for public submission)
CREATE POLICY "Anyone can submit testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (true);

-- Allow everyone to view approved testimonials
CREATE POLICY "Anyone can view approved testimonials" 
ON public.testimonials 
FOR SELECT 
USING (is_approved = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial approved testimonials
INSERT INTO public.testimonials (name, company, position, message, is_approved) VALUES 
('Sarah Johnson', 'TechFlow Solutions', 'CEO', 'Gigglebyte transformed our operations completely. Their AI integration reduced our processing time by 60% and saved us thousands in operational costs.', true),
('Michael Chen', 'GrowthCorp', 'Operations Manager', 'The automation workflows they built for us eliminated 80% of our manual data entry. Our team can now focus on strategic initiatives instead of repetitive tasks.', true),
('Emily Rodriguez', 'StartupX', 'Founder', 'As a startup founder, I was drowning in admin work. Gigglebyte''s solutions gave me back 15 hours per week to focus on growing my business.', true);