import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/utils';
import About from './About';

describe('About Page', () => {
  describe('Hero Section', () => {
    it('should render page heading', () => {
      render(<About />);

      expect(screen.getByRole('heading', { name: /About Us/i })).toBeInTheDocument();
    });

    it('should render subheading text', () => {
      render(<About />);

      expect(screen.getByText(/optimize business operations/i)).toBeInTheDocument();
    });
  });

  describe('Story Section', () => {
    it('should render "Our Story" heading', () => {
      render(<About />);

      expect(screen.getByRole('heading', { name: /Our Story/i })).toBeInTheDocument();
    });

    it('should mention founder name', () => {
      render(<About />);

      // There are multiple mentions of founder name, just verify at least one exists
      expect(screen.getAllByText(/Nerijus Urbietis/i).length).toBeGreaterThan(0);
    });

    it('should render "What We Deliver" list', () => {
      render(<About />);

      expect(screen.getByText(/What We Deliver:/i)).toBeInTheDocument();
      expect(screen.getByText(/CRM systems that actually work/i)).toBeInTheDocument();
      expect(screen.getByText(/Process automation that saves hours/i)).toBeInTheDocument();
      expect(screen.getByText(/AI agents that handle routine tasks/i)).toBeInTheDocument();
    });

    it('should render CTA link to contact page', () => {
      render(<About />);

      const ctaLink = screen.getByRole('link', { name: /Book a Free Audit/i });
      expect(ctaLink).toHaveAttribute('href', '/contact');
    });
  });

  describe('Mission & Vision Section', () => {
    it('should render Mission card', () => {
      render(<About />);

      expect(screen.getByRole('heading', { name: /Our Mission/i })).toBeInTheDocument();
      expect(screen.getByText(/empower businesses/i)).toBeInTheDocument();
    });

    it('should render Vision card', () => {
      render(<About />);

      expect(screen.getByRole('heading', { name: /Our Vision/i })).toBeInTheDocument();
      expect(screen.getByText(/seamlessly enhances human potential/i)).toBeInTheDocument();
    });
  });

  describe('Team Section', () => {
    it('should render "Meet Our Team" heading', () => {
      render(<About />);

      expect(screen.getByRole('heading', { name: /Meet Our Team/i })).toBeInTheDocument();
    });

    it('should render team member card', () => {
      render(<About />);

      expect(screen.getByText(/Founder & Lead Automation Expert/i)).toBeInTheDocument();
    });

    it('should render team member image with alt text', () => {
      render(<About />);

      const teamImage = screen.getByAltText(/Nerijus Urbietis/i);
      expect(teamImage).toBeInTheDocument();
    });
  });

  describe('Values Section', () => {
    it('should render "Our Values" heading', () => {
      render(<About />);

      expect(screen.getByRole('heading', { name: /Our Values/i })).toBeInTheDocument();
    });

    it('should render all three values', () => {
      render(<About />);

      expect(screen.getByRole('heading', { name: 'Innovation' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Excellence' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Partnership' })).toBeInTheDocument();
    });
  });
});
