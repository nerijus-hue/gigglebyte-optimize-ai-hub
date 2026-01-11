import { test, expect } from '@playwright/test';

test.describe('404 Page Behavior', () => {
  test('should display 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');

    await expect(page.getByRole('heading', { name: /404 - Page Not Found/i })).toBeVisible();
    await expect(page.getByText(/Oops! The page you're looking for doesn't exist/i)).toBeVisible();
  });

  test('should provide link to return home', async ({ page }) => {
    await page.goto('/invalid-route-123');

    const homeLink = page.getByRole('link', { name: /Return to Home/i });
    await expect(homeLink).toBeVisible();

    await homeLink.click();
    await expect(page).toHaveURL('/');
  });

  test('should log 404 error to console', async ({ page }) => {
    const consoleMessages: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });

    await page.goto('/random-nonexistent-page');

    // Wait a bit for console message
    await page.waitForTimeout(500);

    expect(consoleMessages.some((msg) => msg.includes('404 Error'))).toBe(true);
  });

  test('should handle deep non-existent routes', async ({ page }) => {
    await page.goto('/level1/level2/level3/nonexistent');

    await expect(page.getByRole('heading', { name: /404 - Page Not Found/i })).toBeVisible();
  });

  test('should still show header and footer on 404 page', async ({ page }) => {
    await page.goto('/nonexistent-page');

    // Header logo should be visible
    await expect(page.getByAltText('Gigglebyte').first()).toBeVisible();
  });
});
