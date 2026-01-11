import { test, expect } from '@playwright/test';

test.describe('Contact Form Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display all form fields', async ({ page }) => {
    await expect(page.getByLabel(/First Name/i)).toBeVisible();
    await expect(page.getByLabel(/Last Name/i)).toBeVisible();
    await expect(page.getByLabel(/Email Address/i)).toBeVisible();
    await expect(page.getByLabel(/Company Name/i)).toBeVisible();
    await expect(page.getByLabel(/Message/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Send Message/i })).toBeVisible();
  });

  test('should have required fields marked', async ({ page }) => {
    const firstNameInput = page.getByLabel(/First Name/i);
    const emailInput = page.getByLabel(/Email Address/i);
    const messageInput = page.getByLabel(/Message/i);

    await expect(firstNameInput).toHaveAttribute('required', '');
    await expect(emailInput).toHaveAttribute('required', '');
    await expect(messageInput).toHaveAttribute('required', '');
  });

  test('should show message length validation error via Zod', async ({ page }) => {
    // Fill all required fields but with short message
    await page.getByLabel(/First Name/i).fill('John');
    await page.getByLabel(/Last Name/i).fill('Doe');
    await page.getByLabel(/Email Address/i).fill('john@example.com');
    await page.getByLabel(/Message/i).fill('Short'); // Less than 10 chars

    await page.getByRole('button', { name: /Send Message/i }).click();

    // Zod validation should kick in for message length
    await expect(page.getByText(/Message must be at least 10 characters/i)).toBeVisible({ timeout: 5000 });
  });

  test('should show loading state during submission', async ({ page }) => {
    // Mock the API endpoint to delay response
    await page.route('**/.netlify/functions/send-contact', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    await page.getByLabel(/First Name/i).fill('John');
    await page.getByLabel(/Last Name/i).fill('Doe');
    await page.getByLabel(/Email Address/i).fill('john@example.com');
    await page.getByLabel(/Message/i).fill('This is a valid test message for E2E testing.');

    await page.getByRole('button', { name: /Send Message/i }).click();

    await expect(page.getByRole('button', { name: /Sending.../i })).toBeDisabled();
  });

  test('should complete full form submission journey', async ({ page }) => {
    // Mock successful API response
    await page.route('**/.netlify/functions/send-contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Contact form submitted successfully' }),
      });
    });

    await page.getByLabel(/First Name/i).fill('John');
    await page.getByLabel(/Last Name/i).fill('Doe');
    await page.getByLabel(/Email Address/i).fill('john@example.com');
    await page.getByLabel(/Company Name/i).fill('Test Corp');
    await page.getByLabel(/Message/i).fill('This is a valid test message for E2E testing. Looking forward to hearing from you!');

    await page.getByRole('button', { name: /Send Message/i }).click();

    // Wait for form to be reset (indicates successful submission)
    await expect(page.getByLabel(/First Name/i)).toHaveValue('', { timeout: 10000 });
  });

  test('should display contact information', async ({ page }) => {
    await expect(page.getByText('nerijus@gigglebyte.ltd')).toBeVisible();
    await expect(page.getByText('+370 656 43244')).toBeVisible();
  });

  test('should have email and phone as clickable links', async ({ page }) => {
    const emailLink = page.getByRole('link', { name: /nerijus@gigglebyte.ltd/i });
    const phoneLink = page.getByRole('link', { name: /\+370 656 43244/i });

    await expect(emailLink).toHaveAttribute('href', 'mailto:nerijus@gigglebyte.ltd');
    await expect(phoneLink).toHaveAttribute('href', 'tel:+37065643244');
  });
});
