import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// CORS configuration - Strict origin checking for security
const ALLOWED_ORIGINS = [
  'https://gigglebyte.ltd',
  'https://www.gigglebyte.ltd',
  'http://localhost:8080',
  'http://localhost:5173'
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Security: Check if origin is allowed
function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return false;
  
  // Exact match
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  
  // Pattern match for deployment previews
  if (origin.match(/^https:\/\/[a-z0-9-]+\.netlify\.app$/)) return true;
  
  return false;
}

// Security: Suspicious user agents to block
const SUSPICIOUS_USER_AGENTS = [
  'curl',
  'wget',
  'python-requests',
  'postman',
  'insomnia'
];

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
  honeypot?: string;
  timestamp: string;
}

// Security: Rate limiting (in-memory, resets on cold start)
export const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

// Export for testing purposes
export function resetRateLimits(): void {
  rateLimitMap.clear();
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip);

  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (clientData.count >= MAX_REQUESTS) {
    return false;
  }

  clientData.count++;
  return true;
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const origin = event.headers.origin || event.headers.Origin;

  // Set CORS origin
  if (origin && isOriginAllowed(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Security: Check origin
  if (!isOriginAllowed(origin)) {
    console.error('CORS violation - Origin not allowed:', origin);
    return {
      statusCode: 403,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Origin not allowed' })
    };
  }

  // Security: Check user agent
  const userAgent = event.headers['user-agent'] || '';
  if (SUSPICIOUS_USER_AGENTS.some(agent => userAgent.toLowerCase().includes(agent))) {
    console.error('Suspicious user agent blocked:', userAgent);
    return {
      statusCode: 403,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Request blocked' })
    };
  }

  // Get client IP for rate limiting
  const clientIP = event.headers['x-forwarded-for']?.split(',')[0].trim() || 
                   event.headers['x-real-ip'] || 
                   'unknown';

  // Security: Rate limiting
  if (!checkRateLimit(clientIP)) {
    console.error('Rate limit exceeded for IP:', clientIP);
    return {
      statusCode: 429,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Too many requests. Please try again later.' })
    };
  }

  try {
    // Parse request body
    const formData: ContactFormData = JSON.parse(event.body || '{}');

    // Security: Honeypot check
    if (formData.honeypot && formData.honeypot.length > 0) {
      console.error('Honeypot triggered - potential spam');
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid submission' })
      };
    }

    // Security: Basic field validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Security: Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Security: Check payload size (prevent DOS)
    const payloadSize = JSON.stringify(formData).length;
    if (payloadSize > 10000) { // 10KB limit
      return {
        statusCode: 413,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Payload too large' })
      };
    }

    // Send to Make.com webhook
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!makeWebhookUrl) {
      console.error('MAKE_WEBHOOK_URL not configured');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    const makeApiKey = process.env.MAKE_API_KEY;
    
    const makePayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      company: formData.company || '',
      message: formData.message,
      timestamp: formData.timestamp,
      source: 'contact_form',
      metadata: {
        userAgent: userAgent,
        ip: clientIP,
        origin: origin
      }
    };

    console.log('Sending to Make.com webhook...');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    // Add Make.com API key header if provided
    if (makeApiKey) {
      headers['x-make-apikey'] = makeApiKey;
    }
    
    const makeResponse = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(makePayload)
    });

    if (!makeResponse.ok) {
      const errorText = await makeResponse.text();
      console.error('Make.com webhook error:', {
        status: makeResponse.status,
        statusText: makeResponse.statusText,
        response: errorText,
        webhookUrl: makeWebhookUrl.substring(0, 40) + '...' // Log partial URL for debugging
      });
      throw new Error(`Make.com webhook failed with status ${makeResponse.status}: ${makeResponse.statusText}`);
    }

    console.log('Make.com webhook successful');

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: true,
        message: 'Contact form submitted successfully' 
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Failed to process contact form. Please try again.' 
      })
    };
  }
};
