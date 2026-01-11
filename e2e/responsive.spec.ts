import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive Behavior', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12 size

  test('should show mobile menu toggle on small screens', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('button', { name: /toggle mobile menu/i })).toBeVisible();
  });

  test('should open and close mobile menu', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /toggle mobile menu/i });

    // Open menu
    await menuButton.click();

    // Menu should be open (aria-expanded true)
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Close menu
    await menuButton.click();

    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should navigate via mobile menu', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /toggle mobile menu/i }).click();

    // Click on About link in mobile menu
    await page.getByRole('link', { name: 'About' }).click();

    await expect(page).toHaveURL('/about');

    // Menu should close after navigation
    await expect(page.getByRole('button', { name: /toggle mobile menu/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  test('should display contact form properly on mobile', async ({ page }) => {
    await page.goto('/contact');

    await expect(page.getByLabel(/First Name/i)).toBeVisible();
    await expect(page.getByLabel(/Last Name/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Send Message/i })).toBeVisible();
  });

  test('should display home page content on mobile', async ({ page }) => {
    await page.goto('/');

    // Check for logo (use first() since there are multiple logos)
    await expect(page.getByAltText('Gigglebyte').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Claim Free Audit/i })).toBeVisible();
  });
});

test.describe('Tablet Responsive Behavior', () => {
  test.use({ viewport: { width: 768, height: 1024 } }); // iPad size

  test('should display desktop navigation on tablet', async ({ page }) => {
    await page.goto('/');

    // Desktop nav should be visible
    await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible();
  });
});

test.describe('Desktop Responsive Behavior', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('should hide mobile menu toggle on desktop', async ({ page }) => {
    await page.goto('/');

    // Mobile menu button should not be visible on desktop
    await expect(page.getByRole('button', { name: /toggle mobile menu/i })).not.toBeVisible();
  });

  test('should display all navigation links on desktop', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Automations' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' }).first()).toBeVisible();
  });
});
