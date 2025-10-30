import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const WAYHUB_FORM_ID = 'fO295j2O3r8J5MO5IPiY';
const WAYHUB_LOCATION_ID = 'ZM4nQmejUnRIfi9uD0cR';
const WAYHUB_API_URL = `https://api.leadconnectorhq.com/forms/fO295j2O3r8J5MO5IPiY/submissions`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  interest?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, phone, message, interest }: ContactFormData = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const userAgent = req.headers.get('user-agent') || '';
    const forwarded = req.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : '';

    let wayhubSent = false;
    let wayhubId = '';

    try {
      let fullMessage = message;
      if (interest) {
        fullMessage = `Interest: ${interest}\n\n${message}`;
      }

      const wayhubPayload = {
        full_name: name,
        email: email,
        phone: phone || '',
        DehnXTVFfpb0r6sCq3lv: fullMessage,
      };

      console.log('Submitting to Wayhub API:', wayhubPayload);

      const response = await fetch(WAYHUB_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wayhubPayload),
      });

      console.log(`Wayhub API response status: ${response.status}`);
      const responseText = await response.text();
      console.log(`Wayhub API response: ${responseText.substring(0, 300)}`);

      if (response.ok || response.status === 200 || response.status === 201) {
        wayhubSent = true;
        wayhubId = 'api-submitted';
        console.log('Successfully submitted to Wayhub API!');
      } else {
        console.error('Wayhub API submission error:', responseText);
      }
    } catch (formError) {
      console.error('Error submitting to Wayhub:', formError);
    }

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          phone: phone || '',
          message,
          interest: interest || '',
          ip_address: ipAddress,
          user_agent: userAgent,
          email_sent: wayhubSent,
          email_id: wayhubId,
        }
      ]);

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message received successfully",
        wayhub_sent: wayhubSent,
        id: wayhubId
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});