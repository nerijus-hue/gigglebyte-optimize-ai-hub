-- Remove the overly permissive RLS policy that allows anyone to insert testimonials
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.testimonials;