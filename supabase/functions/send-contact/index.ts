import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[\x00-\x1f\x7f-\x9f]/g, '') // Remove control characters
    .substring(0, 3000); // Limit length
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received contact form submission');
    
    const { firstName, lastName, email, company, message }: ContactFormData = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Sanitize all inputs
    const sanitizedData = {
      Firstname: sanitizeInput(firstName),
      Lastname: sanitizeInput(lastName),
      Email: sanitizeInput(email),
      Company: company ? sanitizeInput(company) : '',
      Message: sanitizeInput(message)
    };

    console.log('Sanitized data:', { ...sanitizedData, Message: sanitizedData.Message.substring(0, 100) + '...' });

    // Get secrets
    const webhookUrl = Deno.env.get('N8N_WEBHOOK_URL');
    const basicUser = Deno.env.get('N8N_BASIC_USER');
    const basicPass = Deno.env.get('N8N_BASIC_PASS');

    if (!webhookUrl || !basicUser || !basicPass) {
      console.error('Missing required environment variables');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create Basic Auth header
    const credentials = btoa(`${basicUser}:${basicPass}`);
    const authHeader = `Basic ${credentials}`;

    console.log('Sending to webhook:', webhookUrl);

    // Send to n8n webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify(sanitizedData),
    });

    console.log('Webhook response status:', webhookResponse.status);

    // Check if webhook was successful (2xx status codes)
    if (webhookResponse.status >= 200 && webhookResponse.status < 300) {
      console.log('Contact form submitted successfully');
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      console.error('Webhook failed with status:', webhookResponse.status);
      return new Response(JSON.stringify({ 
        error: 'Email failed to send' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in send-contact function:', error);
    return new Response(JSON.stringify({ 
      error: 'Email failed to send' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});