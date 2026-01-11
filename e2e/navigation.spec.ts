import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
  // Skip desktop navigation tests on mobile devices
  test.skip(({ isMobile }) => isMobile, 'Desktop navigation tests are not applicable on mobile');

  test('should navigate through all pages from header', async ({ page }) => {
    await page.goto('/');

    // Verify home page loaded
    await expect(page).toHaveURL('/');

    // Navigate to About
    await page.getByRole('link', { name: 'About' }).first().click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: /About Us/i })).toBeVisible();

    // Navigate to Automations
    await page.getByRole('link', { name: 'Automations' }).first().click();
    await expect(page).toHaveURL('/automations');

    // Navigate to Contact
    await page.getByRole('link', { name: 'Contact' }).first().click();
    await expect(page).toHaveURL('/contact');
    await expect(page.getByRole('heading', { name: /Get In Touch/i })).toBeVisible();

    // Navigate back to Home via logo
    await page.getByAltText('Gigglebyte').first().click();
    await expect(page).toHaveURL('/');
  });

  test('should highlight active navigation item', async ({ page }) => {
    await page.goto('/about');

    const aboutLink = page.getByRole('link', { name: 'About' }).first();
    await expect(aboutLink).toHaveClass(/text-primary/);
  });

  test('should scroll to top on page navigation', async ({ page }) => {
    await page.goto('/');

    // Scroll down on home page
    await page.evaluate(() => window.scrollTo(0, 1000));

    // Navigate to About
    await page.getByRole('link', { name: 'About' }).first().click();
    await page.waitForURL('/about');

    // Should be scrolled to top
    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBe(0);
  });

  test('should have working CTA links on home page', async ({ page }) => {
    await page.goto('/');

    // Click "Claim Free Audit" button
    await page.getByRole('link', { name: /Claim Free Audit/i }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('should have working "Book a call" CTA', async ({ page }) => {
    await page.goto('/');

    // Scroll to bottom CTA
    await page.getByRole('link', { name: /Book a call/i }).scrollIntoViewIfNeeded();
    await page.getByRole('link', { name: /Book a call/i }).click();
    await expect(page).toHaveURL('/contact');
  });
});
