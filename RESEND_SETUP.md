# Resend.com Email Service Setup Guide

This document provides step-by-step instructions for integrating Resend.com email service with your Gold Commercial website's contact form.

## Prerequisites

1. A Resend.com account (sign up at https://resend.com)
2. Your Gold Commercial website deployed
3. Access to your `.env` file

## Step 1: Create Resend Account and Get API Key

1. Go to https://resend.com and sign up for an account
2. Verify your email address
3. Navigate to **API Keys** section in your dashboard
4. Click **Create API Key**
5. Give it a name (e.g., "Gold Commercial Production")
6. Copy the API key (it starts with `re_`)

## Step 2: Add API Key to Environment Variables

Add the following to your `.env` file:

```bash
VITE_RESEND_API_KEY=your_api_key_here
```

**IMPORTANT:** Never commit your `.env` file to version control!

## Step 3: Verify Your Domain (Optional but Recommended)

For production use, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `goldcommercial.com.au`)
4. Follow the DNS setup instructions provided by Resend
5. Wait for DNS propagation (usually 24-48 hours)

## Step 4: Create Supabase Edge Function for Email

We'll create a Supabase Edge Function to handle contact form submissions securely.

### Create the Edge Function

The edge function file should be created at:
`supabase/functions/send-contact-email/index.ts`

```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

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
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, phone, message }: ContactFormData = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Gold Commercial <contact@goldcommercial.com.au>',
        to: ['info@goldcommercial.com.au'],
        subject: `New Contact Form: ${name}`,
        html: emailHtml,
        reply_to: email,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
        id: data.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
```

### Deploy the Edge Function

Use the Supabase dashboard or CLI to deploy this function with the RESEND_API_KEY secret.

## Step 5: Add RESEND_API_KEY Secret to Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Edge Functions** → **Secrets**
3. Add a new secret:
   - Name: `RESEND_API_KEY`
   - Value: Your Resend API key (starts with `re_`)
4. Save the secret

## Step 6: Update Contact Form Component

Update `src/pages/Contact.tsx` to call the Edge Function:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitMessage('');

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    setSubmitMessage('Thank you! Your message has been sent successfully.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  } catch (error) {
    console.error('Error sending message:', error);
    setSubmitMessage('Failed to send message. Please try again or email us directly.');
  } finally {
    setIsSubmitting(false);
  }
};
```

## Step 7: Test the Integration

1. Go to your contact page
2. Fill out the form with test data
3. Submit the form
4. Check:
   - The Resend dashboard for email delivery status
   - Your inbox for the email
   - Supabase Edge Function logs for any errors

## Important Notes

### Email Sending Limits

Resend free tier includes:
- 100 emails per day
- 3,000 emails per month

For higher volumes, consider upgrading to a paid plan.

### Best Practices

1. **Always use Edge Functions** - Never expose your Resend API key in client-side code
2. **Implement rate limiting** - Prevent spam by adding rate limits to your contact form
3. **Validate input** - Always validate and sanitize user input before sending emails
4. **Set up SPF/DKIM** - Configure proper email authentication for better deliverability
5. **Monitor delivery** - Regularly check Resend dashboard for bounces and failures

### Troubleshooting

**Email not sending:**
- Check that RESEND_API_KEY is correctly set in Supabase secrets
- Verify your domain is verified in Resend (for production)
- Check Edge Function logs for errors
- Ensure CORS headers are properly configured

**Emails going to spam:**
- Verify your domain in Resend
- Set up SPF and DKIM records
- Use a verified sending domain
- Avoid spam trigger words in subject/body

### Alternative: Development/Testing

For testing without deploying the Edge Function, you can use Resend's test mode:

1. Go to Resend dashboard → **API Keys**
2. Create a test API key
3. Use it in development
4. Emails will be caught in Resend's dashboard instead of being delivered

## Support

- Resend Documentation: https://resend.com/docs
- Resend Status: https://status.resend.com
- Supabase Edge Functions: https://supabase.com/docs/guides/functions

## Security Checklist

- [ ] API key stored securely in Supabase secrets
- [ ] Never committed API key to version control
- [ ] Domain verified in Resend
- [ ] SPF and DKIM records configured
- [ ] Rate limiting implemented
- [ ] Input validation in place
- [ ] Error handling properly configured
- [ ] CORS properly configured
