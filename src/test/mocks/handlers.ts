import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock Netlify function endpoint
  http.post('/.netlify/functions/send-contact', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;

    // Simulate honeypot detection
    if (body.honeypot) {
      return HttpResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Simulate validation errors
    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return HttpResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Simulate successful submission
    return HttpResponse.json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  }),
];
