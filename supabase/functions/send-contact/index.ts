import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Allowed origins for CORS (add your production domain here)
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://gigglebyte.ltd',
  'https://www.gigglebyte.ltd',
];

// Allowed domain patterns for CORS
const ALLOWED_DOMAIN_PATTERNS = [
  /^https:\/\/.*\.lovable\.dev$/,
  /^https:\/\/.*\.lovable\.app$/,
  /^https:\/\/.*\.sandbox\.lovable\.dev$/,
];

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per 15 minutes per IP

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
  hcaptchaToken?: string;
  honeypot?: string; // Should be empty
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Will be overridden with specific origin
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get('origin');
  const userAgent = req.headers.get('user-agent') || '';
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

  // Enhanced CORS check with pattern matching
  let allowedOrigin = null;
  
  if (origin) {
    // Check exact matches first
    allowedOrigin = ALLOWED_ORIGINS.find(allowed => 
      allowed === origin || (origin.includes('localhost'))
    );
    
    // If no exact match, check domain patterns
    if (!allowedOrigin) {
      const isPatternMatch = ALLOWED_DOMAIN_PATTERNS.some(pattern => pattern.test(origin));
      if (isPatternMatch) {
        allowedOrigin = origin;
      }
    }
    
    // Log blocked origins for debugging
    if (!allowedOrigin) {
      console.log(`CORS blocked origin: ${origin} from IP: ${clientIP}`);
    }
  } else {
    console.log(`No origin header from IP: ${clientIP}`);
  }

  const responseHeaders = {
    ...corsHeaders,
    'Access-Control-Allow-Origin': allowedOrigin || 'null',
  };

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: responseHeaders });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...responseHeaders },
    });
  }

  // Block suspicious user agents
  const suspiciousPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /python-requests/i, /postman/i
  ];
  
  if (!userAgent || suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    console.log(`Blocked suspicious user agent: ${userAgent} from IP: ${clientIP}`);
    return new Response(JSON.stringify({ error: 'Access denied' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', ...responseHeaders },
    });
  }

  // Rate limiting check
  const now = Date.now();
  const rateKey = clientIP;
  const rateData = rateLimitMap.get(rateKey);
  
  if (rateData) {
    if (now < rateData.resetTime) {
      if (rateData.count >= RATE_LIMIT_MAX_REQUESTS) {
        console.log(`Rate limit exceeded for IP: ${clientIP}`);
        return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json', ...responseHeaders },
        });
      }
      rateData.count++;
    } else {
      // Reset the rate limit window
      rateData.count = 1;
      rateData.resetTime = now + RATE_LIMIT_WINDOW;
    }
  } else {
    rateLimitMap.set(rateKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  try {
    const body = await req.text();
    let data: ContactFormData;
    
    try {
      data = JSON.parse(body);
    } catch {
      throw new Error('Invalid JSON payload');
    }

    const { firstName, lastName, email, company, message, hcaptchaToken, honeypot } = data;

    // Honeypot check - this field should be empty
    if (honeypot && honeypot.trim() !== '') {
      console.log(`Honeypot triggered from IP: ${clientIP}`);
      return new Response(JSON.stringify({ error: 'Spam detected' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...responseHeaders },
      });
    }

    // Basic payload validation
    if (!firstName || !lastName || !email || !message) {
      throw new Error('Missing required fields');
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Payload size limits
    if (body.length > 10000) { // 10KB limit
      throw new Error('Payload too large');
    }

    // Message length limits
    if (message.length > 2000) {
      throw new Error('Message too long');
    }

    // Verify hCaptcha token if provided
    const hcaptchaSecret = Deno.env.get('HCAPTCHA_SECRET_KEY');
    if (hcaptchaSecret && hcaptchaToken) {
      const hcaptchaResponse = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: hcaptchaSecret,
          response: hcaptchaToken,
          remoteip: clientIP,
        }),
      });

      const hcaptchaResult = await hcaptchaResponse.json();
      if (!hcaptchaResult.success) {
        console.log(`hCaptcha verification failed for IP: ${clientIP}:`, hcaptchaResult);
        return new Response(JSON.stringify({ error: 'Captcha verification failed' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...responseHeaders },
        });
      }
    }

    // Get environment variables for n8n
    const webhookUrl = Deno.env.get('N8N_WEBHOOK_URL');
    const basicUser = Deno.env.get('N8N_BASIC_USER');
    const basicPass = Deno.env.get('N8N_BASIC_PASS');

    if (!webhookUrl || !basicUser || !basicPass) {
      console.error('Missing required environment variables');
      throw new Error('Server configuration error');
    }

    // Prepare payload for n8n
    const payload = {
      Firstname: firstName,
      Lastname: lastName,
      Company: company || '',
      Email: email,
      Message: message,
      SubmittedAt: new Date().toISOString(),
      ClientIP: clientIP,
      UserAgent: userAgent,
    };

    // Create Basic Auth header
    const basicAuth = btoa(`${basicUser}:${basicPass}`);

    // Send to n8n webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('n8n webhook error:', response.status, await response.text());
      throw new Error('Failed to send contact form');
    }

    const result = await response.json().catch(() => ({}));
    console.log(`Contact form sent successfully to n8n from IP: ${clientIP}:`, result);

    return new Response(JSON.stringify({ success: true, message: 'Contact form submitted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...responseHeaders,
      },
    });
  } catch (error: any) {
    console.error(`Error in send-contact function from IP: ${clientIP}:`, error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to submit contact form' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...responseHeaders },
      }
    );
  }
};

serve(handler);