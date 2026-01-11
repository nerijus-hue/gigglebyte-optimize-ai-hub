import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import { navItems } from '@/config/navigation';

const renderWithRoute = (initialRoute: string) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="*" element={<Header />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Header Component', () => {
  describe('Logo', () => {
    it('should render logo image', () => {
      renderWithRoute('/');

      const logo = screen.getByAltText('Gigglebyte');
      expect(logo).toBeInTheDocument();
    });

    it('should link logo to home page', () => {
      renderWithRoute('/');

      const logoLink = screen.getByRole('link', { name: /gigglebyte/i });
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });

  describe('Desktop Navigation', () => {
    it('should render all nav items', () => {
      renderWithRoute('/');

      navItems.forEach((item) => {
        expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument();
      });
    });

    it('should have correct href for each nav item', () => {
      renderWithRoute('/');

      navItems.forEach((item) => {
        const link = screen.getByRole('link', { name: item.label });
        expect(link).toHaveAttribute('href', item.href);
      });
    });

    it('should highlight active link on home page', () => {
      renderWithRoute('/');

      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink.className).toContain('text-primary');
    });

    it('should highlight active link on about page', () => {
      renderWithRoute('/about');

      const aboutLink = screen.getByRole('link', { name: 'About' });
      expect(aboutLink.className).toContain('text-primary');
    });

    it('should highlight active link on automations page', () => {
      renderWithRoute('/automations');

      const automationsLink = screen.getByRole('link', { name: 'Automations' });
      expect(automationsLink.className).toContain('text-primary');
    });

    it('should highlight active link on contact page', () => {
      renderWithRoute('/contact');

      const contactLink = screen.getByRole('link', { name: 'Contact' });
      expect(contactLink.className).toContain('text-primary');
    });
  });

  describe('Mobile Menu', () => {
    it('should render mobile menu toggle button', () => {
      renderWithRoute('/');

      const menuButton = screen.getByRole('button', { name: /toggle mobile menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    it('should toggle mobile menu visibility on button click', async () => {
      const user = userEvent.setup();
      renderWithRoute('/');

      const menuButton = screen.getByRole('button', { name: /toggle mobile menu/i });

      // Initially aria-expanded should be false
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');

      // Click to open
      await user.click(menuButton);

      // aria-expanded should now be true
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should close mobile menu when clicking a nav link', async () => {
      const user = userEvent.setup();
      renderWithRoute('/');

      const menuButton = screen.getByRole('button', { name: /toggle mobile menu/i });
      await user.click(menuButton);

      // Menu should be open
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // Click on a mobile nav link (get all links and find one in the mobile menu)
      const allLinks = screen.getAllByRole('link', { name: 'About' });
      const mobileAboutLink = allLinks[allLinks.length - 1]; // Get the mobile menu version
      await user.click(mobileAboutLink);

      // Menu should close
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have correct aria-expanded attribute toggle', async () => {
      const user = userEvent.setup();
      renderWithRoute('/');

      const menuButton = screen.getByRole('button', { name: /toggle mobile menu/i });

      expect(menuButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      await user.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
