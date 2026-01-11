import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/utils';
import Contact from './Contact';

describe('Contact Page', () => {
  describe('Page Structure', () => {
    it('should render page heading', () => {
      render(<Contact />);

      expect(screen.getByRole('heading', { name: /Get In Touch/i })).toBeInTheDocument();
    });

    it('should render contact form', () => {
      render(<Contact />);

      expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    });

    it('should render contact information', () => {
      render(<Contact />);

      expect(screen.getByText('nerijus@gigglebyte.ltd')).toBeInTheDocument();
      expect(screen.getByText('+370 656 43244')).toBeInTheDocument();
    });

    it('should render submit button', () => {
      render(<Contact />);

      expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
    });

    it('should have hidden honeypot field', () => {
      render(<Contact />);

      const honeypotField = document.querySelector('input[name="honeypot"]');
      expect(honeypotField).toBeInTheDocument();
      // Parent element has absolute positioning to hide it from view
      expect(honeypotField?.parentElement?.className).toContain('absolute');
    });

    it('should have email link in contact info', () => {
      render(<Contact />);

      const emailLink = screen.getByRole('link', { name: /nerijus@gigglebyte.ltd/i });
      expect(emailLink).toHaveAttribute('href', 'mailto:nerijus@gigglebyte.ltd');
    });

    it('should have phone link in contact info', () => {
      render(<Contact />);

      const phoneLink = screen.getByRole('link', { name: /\+370 656 43244/i });
      expect(phoneLink).toHaveAttribute('href', 'tel:+37065643244');
    });

    it('should mark required fields with asterisk', () => {
      render(<Contact />);

      // All required fields should have * in their labels
      expect(screen.getByText(/First Name \*/i)).toBeInTheDocument();
      expect(screen.getByText(/Last Name \*/i)).toBeInTheDocument();
      expect(screen.getByText(/Email Address \*/i)).toBeInTheDocument();
      expect(screen.getByText(/Message \*/i)).toBeInTheDocument();
    });

    it('should have company field as optional (no asterisk)', () => {
      render(<Contact />);

      // Company field should not have *
      const companyLabel = screen.getByText(/Company Name/i);
      expect(companyLabel.textContent).not.toContain('*');
    });
  });

  describe('Form Attributes', () => {
    it('should have required attribute on first name', () => {
      render(<Contact />);

      const firstNameInput = screen.getByLabelText(/First Name/i);
      expect(firstNameInput).toHaveAttribute('required');
    });

    it('should have required attribute on last name', () => {
      render(<Contact />);

      const lastNameInput = screen.getByLabelText(/Last Name/i);
      expect(lastNameInput).toHaveAttribute('required');
    });

    it('should have email type on email field', () => {
      render(<Contact />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
    });

    it('should have required attribute on message', () => {
      render(<Contact />);

      const messageInput = screen.getByLabelText(/Message/i);
      expect(messageInput).toHaveAttribute('required');
    });

    it('should have correct placeholder text for first name', () => {
      render(<Contact />);

      const firstNameInput = screen.getByLabelText(/First Name/i);
      expect(firstNameInput).toHaveAttribute('placeholder', 'First name');
    });

    it('should have correct placeholder text for email', () => {
      render(<Contact />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      expect(emailInput).toHaveAttribute('placeholder', 'your@email.com');
    });
  });
});
