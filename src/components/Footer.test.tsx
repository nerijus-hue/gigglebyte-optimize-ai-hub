import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/utils';
import Footer from './Footer';

describe('Footer Component', () => {
  it('should render copyright text', () => {
    render(<Footer />);

    expect(screen.getByText(/© 2025 Gigglebyte\. All rights reserved\./i)).toBeInTheDocument();
  });

  describe('Social Links', () => {
    it('should render LinkedIn link', () => {
      render(<Footer />);

      const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
      expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/company/108490342/');
      expect(linkedInLink).toHaveAttribute('target', '_blank');
      expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should render X (Twitter) link', () => {
      render(<Footer />);

      const twitterLink = screen.getByRole('link', { name: /x \(formerly twitter\)/i });
      expect(twitterLink).toHaveAttribute('href', 'https://x.com/gigglebyteltd');
      expect(twitterLink).toHaveAttribute('target', '_blank');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should have proper aria-labels for accessibility', () => {
      render(<Footer />);

      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByLabelText('X (formerly Twitter)')).toBeInTheDocument();
    });
  });
});
