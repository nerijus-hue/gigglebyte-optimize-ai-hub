import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/utils';
import Home from './Home';

describe('Home Page', () => {
  describe('Hero Section', () => {
    it('should render hero section with logo', () => {
      render(<Home />);

      const logo = screen.getByAltText('Gigglebyte');
      expect(logo).toBeInTheDocument();
    });

    it('should render tagline text', () => {
      render(<Home />);

      expect(screen.getByText(/20-50% Efficiency Boost/i)).toBeInTheDocument();
    });

    it('should render CTA button linking to contact page', () => {
      render(<Home />);

      const ctaButton = screen.getByRole('link', { name: /Claim Free Audit/i });
      expect(ctaButton).toHaveAttribute('href', '/contact');
    });
  });

  describe('Target Audience Section', () => {
    it('should render section heading', () => {
      render(<Home />);

      expect(screen.getByRole('heading', { name: /How we can help you/i })).toBeInTheDocument();
    });

    it('should render "See All Key Benefits" toggle button', () => {
      render(<Home />);

      expect(screen.getByRole('button', { name: /See All Key Benefits/i })).toBeInTheDocument();
    });

    it('should toggle button text when clicking expand/collapse', async () => {
      const user = userEvent.setup();
      render(<Home />);

      const toggleButton = screen.getByRole('button', { name: /See All Key Benefits/i });

      // Click to expand
      await user.click(toggleButton);

      // Button text should change
      expect(screen.getByRole('button', { name: /Hide All Key Benefits/i })).toBeInTheDocument();

      // Click again to collapse
      await user.click(screen.getByRole('button', { name: /Hide All Key Benefits/i }));
      expect(screen.getByRole('button', { name: /See All Key Benefits/i })).toBeInTheDocument();
    });

    it('should render accordion triggers for each audience card', () => {
      render(<Home />);

      const accordionTriggers = screen.getAllByRole('button', { name: /View Key Benefits/i });
      expect(accordionTriggers.length).toBeGreaterThan(0);
    });
  });

  describe('Services Section', () => {
    it('should render section heading', () => {
      render(<Home />);

      expect(screen.getByRole('heading', { name: /Our Services/i })).toBeInTheDocument();
    });

    it('should render "Book a Free Audit" link', () => {
      render(<Home />);

      const auditLinks = screen.getAllByRole('link', { name: /Book a Free Audit/i });
      expect(auditLinks.length).toBeGreaterThan(0);
      expect(auditLinks[0]).toHaveAttribute('href', '/contact');
    });
  });

  describe('Benefits Section', () => {
    it('should render section heading', () => {
      render(<Home />);

      expect(screen.getByRole('heading', { name: /Why Choose Gigglebyte/i })).toBeInTheDocument();
    });
  });

  describe('CTA Section', () => {
    it('should render final CTA section', () => {
      render(<Home />);

      expect(screen.getByRole('heading', { name: /Ready to Transform Your Business/i })).toBeInTheDocument();
    });

    it('should render "Book a call" button linking to contact', () => {
      render(<Home />);

      const ctaButton = screen.getByRole('link', { name: /Book a call/i });
      expect(ctaButton).toHaveAttribute('href', '/contact');
    });
  });
});
