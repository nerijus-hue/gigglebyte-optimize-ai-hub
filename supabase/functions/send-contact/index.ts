import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parse and validate request body
    const body = await req.json()
    
    // Basic validation
    if (!body.Firstname || !body.Lastname || !body.Email || !body.Message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get webhook URL from environment
    const webhookUrl = Deno.env.get('N8N_WEBHOOK_URL')
    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL not configured')
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get Basic Auth credentials if available
    const basicUser = Deno.env.get('N8N_BASIC_USER')
    const basicPass = Deno.env.get('N8N_BASIC_PASS')
    
    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Add Basic Auth header if credentials are available
    if (basicUser && basicPass) {
      const credentials = btoa(`${basicUser}:${basicPass}`)
      requestHeaders['Authorization'] = `Basic ${credentials}`
      console.log('Using Basic Auth for webhook request')
    }

    // Forward request to n8n webhook with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        return new Response(
          JSON.stringify({ success: true, message: 'Message sent successfully' }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      } else {
        const errorText = await response.text().catch(() => 'No response body')
        console.error('N8N webhook failed:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        })
        
        return new Response(
          JSON.stringify({ error: 'Failed to send message' }),
          { 
            status: 502, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error.name === 'AbortError') {
        console.error('Request timeout to n8n webhook')
        return new Response(
          JSON.stringify({ error: 'Request timeout' }),
          { 
            status: 504, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
      
      console.error('Network error calling n8n webhook:', error)
      return new Response(
        JSON.stringify({ error: 'Network error' }),
        { 
          status: 502, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})