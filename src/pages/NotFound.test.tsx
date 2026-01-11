import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Page', () => {
  it('should render 404 heading', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /404 - Page Not Found/i })).toBeInTheDocument();
  });

  it('should render error message', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Oops! The page you're looking for doesn't exist/i)).toBeInTheDocument();
  });

  it('should render link to home page', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /Return to Home/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should log 404 error with pathname to console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={['/non-existent-page']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      '404 Error: User attempted to access non-existent route:',
      '/non-existent-page'
    );

    consoleSpy.mockRestore();
  });
});
