import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import type { HandlerEvent, HandlerContext } from '@netlify/functions';
import { server } from '../../src/test/mocks/server';

// Stop MSW server for these tests - we mock fetch directly
beforeAll(() => {
  server.close();
});

afterAll(() => {
  server.listen();
});

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Import handler and reset function after mocking
import { handler, resetRateLimits } from './send-contact';

describe('send-contact Netlify function', () => {
  const validFormData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    company: 'Test Corp',
    message: 'This is a test message with enough characters.',
    timestamp: new Date().toISOString(),
  };

  const createEvent = (overrides: Partial<HandlerEvent> = {}): HandlerEvent => ({
    httpMethod: 'POST',
    headers: {
      origin: 'https://gigglebyte.ltd',
      'user-agent': 'Mozilla/5.0',
      'x-forwarded-for': '192.168.1.1',
    },
    body: JSON.stringify(validFormData),
    rawUrl: 'https://example.com/.netlify/functions/send-contact',
    rawQuery: '',
    path: '/.netlify/functions/send-contact',
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    multiValueHeaders: {},
    isBase64Encoded: false,
    ...overrides,
  });

  const mockContext: HandlerContext = {
    callbackWaitsForEmptyEventLoop: true,
    functionName: 'send-contact',
    functionVersion: '1',
    invokedFunctionArn: '',
    memoryLimitInMB: '128',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: () => 10000,
    done: () => {},
    fail: () => {},
    succeed: () => {},
  };

  beforeEach(() => {
    vi.resetAllMocks();
    resetRateLimits(); // Clear rate limit map before each test
    process.env.MAKE_WEBHOOK_URL = 'https://hook.make.com/test';
    mockFetch.mockResolvedValue({ ok: true, text: () => Promise.resolve('') });
  });

  afterEach(() => {
    delete process.env.MAKE_WEBHOOK_URL;
    delete process.env.MAKE_API_KEY;
  });

  describe('CORS and HTTP Method validation', () => {
    it('should handle OPTIONS preflight request', async () => {
      const event = createEvent({ httpMethod: 'OPTIONS' });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(200);
      expect(result.body).toBe('');
    });

    it('should reject non-POST methods with 405', async () => {
      const event = createEvent({ httpMethod: 'GET' });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(405);
      expect(JSON.parse(result.body).error).toBe('Method not allowed');
    });

    it('should reject PUT method with 405', async () => {
      const event = createEvent({ httpMethod: 'PUT' });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(405);
    });

    it('should set CORS headers for allowed origin', async () => {
      const event = createEvent();
      const result = await handler(event, mockContext);

      expect(result.headers!['Access-Control-Allow-Origin']).toBe('https://gigglebyte.ltd');
    });
  });

  describe('Origin validation', () => {
    it('should allow gigglebyte.ltd origin', async () => {
      const event = createEvent();
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(200);
    });

    it('should allow www.gigglebyte.ltd origin', async () => {
      const event = createEvent({
        headers: {
          origin: 'https://www.gigglebyte.ltd',
          'user-agent': 'Mozilla/5.0',
          'x-forwarded-for': '192.168.1.1'
        },
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(200);
    });

    it('should allow localhost:8080 for development', async () => {
      const event = createEvent({
        headers: {
          origin: 'http://localhost:8080',
          'user-agent': 'Mozilla/5.0',
          'x-forwarded-for': '192.168.1.1'
        },
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(200);
    });

    it('should allow Netlify preview URLs', async () => {
      const event = createEvent({
        headers: {
          origin: 'https://deploy-preview-123.netlify.app',
          'user-agent': 'Mozilla/5.0',
          'x-forwarded-for': '192.168.1.1'
        },
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(200);
    });

    it('should reject unknown origins with 403', async () => {
      const event = createEvent({
        headers: {
          origin: 'https://malicious-site.com',
          'user-agent': 'Mozilla/5.0',
          'x-forwarded-for': '192.168.1.1'
        },
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(403);
      expect(JSON.parse(result.body).error).toBe('Origin not allowed');
    });

    it('should reject requests without origin', async () => {
      const event = createEvent({
        headers: {
          'user-agent': 'Mozilla/5.0',
          'x-forwarded-for': '192.168.1.1'
        },
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(403);
    });
  });

  describe('User agent validation', () => {
    it('should block curl user agent', async () => {
      const event = createEvent({
        headers: {
          origin: 'https://gigglebyte.ltd',
          'user-agent': 'curl/7.68.0',
          'x-forwarded-for': '192.168.1.1'
        },
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(403);
      expect(JSON.parse(result.body).error).toBe('Request blocked');
    });

    it('should block wget user agent', async () => {
      const event = createEvent({
        headers: {
          origin: 'https://gigglebyte.ltd',
          'user-agent': 'wget/1.21',
          'x-forwarded-for': '192.168.1.1'
        },
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(403);
    });

    it('should allow normal browser user agents', async () => {
      const event = createEvent({
        headers: {
          origin: 'https://gigglebyte.ltd',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'x-forwarded-for': '192.168.1.1'
        },
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(200);
    });
  });

  describe('Form validation', () => {
    it('should reject honeypot-filled submissions', async () => {
      const event = createEvent({
        body: JSON.stringify({ ...validFormData, honeypot: 'spam' }),
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(400);
      expect(JSON.parse(result.body).error).toBe('Invalid submission');
    });

    it('should reject missing firstName', async () => {
      const { firstName, ...incomplete } = validFormData;
      const event = createEvent({
        body: JSON.stringify(incomplete),
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(400);
      expect(JSON.parse(result.body).error).toBe('Missing required fields');
    });

    it('should reject missing email', async () => {
      const { email, ...incomplete } = validFormData;
      const event = createEvent({
        body: JSON.stringify(incomplete),
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(400);
    });

    it('should reject invalid email format', async () => {
      const event = createEvent({
        body: JSON.stringify({ ...validFormData, email: 'invalid-email' }),
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(400);
      expect(JSON.parse(result.body).error).toBe('Invalid email format');
    });

    it('should reject payloads over 10KB', async () => {
      const largeMessage = 'x'.repeat(15000);
      const event = createEvent({
        body: JSON.stringify({ ...validFormData, message: largeMessage }),
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(413);
      expect(JSON.parse(result.body).error).toBe('Payload too large');
    });

    it('should allow optional company field to be empty', async () => {
      const { company, ...withoutCompany } = validFormData;
      const event = createEvent({
        body: JSON.stringify(withoutCompany),
      });
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(200);
    });
  });

  describe('Make.com webhook integration', () => {
    it('should return 500 when MAKE_WEBHOOK_URL is not configured', async () => {
      delete process.env.MAKE_WEBHOOK_URL;
      const event = createEvent();
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(500);
      expect(JSON.parse(result.body).error).toBe('Server configuration error');
    });

    it('should send correct payload to Make.com webhook', async () => {
      const event = createEvent();
      await handler(event, mockContext);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://hook.make.com/test',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
          body: expect.any(String),
        })
      );

      const sentPayload = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(sentPayload.firstName).toBe('John');
      expect(sentPayload.source).toBe('contact_form');
      expect(sentPayload.metadata).toBeDefined();
    });

    it('should include Make API key header when configured', async () => {
      process.env.MAKE_API_KEY = 'test-api-key';
      const event = createEvent();
      await handler(event, mockContext);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({ 'x-make-apikey': 'test-api-key' }),
        })
      );
    });

    it('should handle Make.com webhook failure', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: () => Promise.resolve('Error'),
      });

      const event = createEvent();
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(500);
      expect(JSON.parse(result.body).error).toContain('Failed to process');
    });

    it('should return success response on valid submission', async () => {
      const event = createEvent();
      const result = await handler(event, mockContext);

      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.message).toBe('Contact form submitted successfully');
    });
  });
});
