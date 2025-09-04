import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, company, message }: ContactFormData = await req.json();

    // Get environment variables
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
      Message: message
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
    console.log('Contact form sent successfully to n8n:', result);

    return new Response(JSON.stringify({ success: true, message: 'Contact form submitted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('Error in send-contact function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit contact form' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);