# Google Sheets & Gmail Integration Guide

This guide explains how to automatically save contact form submissions to Google Sheets and send emails from your Gmail account.

## Overview

All contact form submissions are already being saved to your Supabase database (`contact_submissions` table). This guide shows you how to:

1. **Sync data to Google Sheets** - Automatically export submissions to a Google Sheet
2. **Use Gmail for sending emails** - Replace Resend with your Gmail account (optional)

---

## Part 1: Google Sheets Integration

### Option A: Using Zapier (Easiest - No Code)

**Zapier** is the simplest way to connect Supabase to Google Sheets.

#### Step 1: Sign Up for Zapier
1. Go to https://zapier.com and create a free account
2. Free tier includes 100 tasks/month

#### Step 2: Create a New Zap
1. Click **Create Zap**
2. Name it: "Contact Forms to Google Sheets"

#### Step 3: Set Up Trigger (Supabase)
1. **Search for trigger:** "Webhooks by Zapier"
2. **Event:** Catch Hook
3. **Copy the webhook URL** provided by Zapier
4. Keep this tab open

#### Step 4: Create Webhook in Supabase

Create a new Edge Function to send data to Zapier:

```typescript
// supabase/functions/webhook-to-zapier/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ZAPIER_WEBHOOK_URL = 'YOUR_ZAPIER_WEBHOOK_URL_HERE';

Deno.serve(async (req: Request) => {
  try {
    const data = await req.json();

    // Forward to Zapier
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
```

#### Step 5: Update Contact Email Function

Modify `supabase/functions/send-contact-email/index.ts` to call the webhook:

Add after storing in database (around line 135):

```typescript
// Send to Zapier webhook
try {
  await fetch(
    `${supabaseUrl}/functions/v1/webhook-to-zapier`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone: phone || '',
        message,
        interest: interest || '',
        submitted_at: new Date().toISOString(),
      }),
    }
  );
} catch (webhookError) {
  console.error('Webhook error:', webhookError);
}
```

#### Step 6: Test the Trigger
1. Go back to Zapier
2. Submit a test form on your website
3. Click **Test trigger** in Zapier
4. You should see the form data

#### Step 7: Set Up Action (Google Sheets)
1. **Search for action:** "Google Sheets"
2. **Event:** Create Spreadsheet Row
3. **Connect your Google account**
4. **Create or select a spreadsheet**
5. **Map the fields:**
   - Column A: Name → `name`
   - Column B: Email → `email`
   - Column C: Phone → `phone`
   - Column D: Message → `message`
   - Column E: Interest → `interest`
   - Column F: Submitted At → `submitted_at`

#### Step 8: Turn On Your Zap
1. Click **Publish**
2. Your Zap is now active!

**Every contact form submission will now appear in your Google Sheet automatically.**

---

### Option B: Using Supabase + Google Sheets API (Advanced)

If you prefer direct integration without third-party services:

#### Step 1: Create Google Cloud Project
1. Go to https://console.cloud.google.com
2. Create a new project
3. Enable Google Sheets API
4. Create a Service Account
5. Download the JSON key file

#### Step 2: Share Your Google Sheet
1. Create a new Google Sheet for contact submissions
2. Share it with the service account email (from JSON file)
3. Give it Editor permissions

#### Step 3: Create Edge Function

```typescript
// supabase/functions/sync-to-sheets/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GOOGLE_SHEETS_CREDENTIALS = Deno.env.get('GOOGLE_SHEETS_CREDENTIALS');
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

Deno.serve(async (req: Request) => {
  try {
    const data = await req.json();

    // Parse service account credentials
    const credentials = JSON.parse(GOOGLE_SHEETS_CREDENTIALS);

    // Get OAuth token
    // ... (OAuth implementation)

    // Append row to sheet
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [[
            data.name,
            data.email,
            data.phone,
            data.message,
            data.interest,
            data.submitted_at,
          ]],
        }),
      }
    );

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
});
```

---

## Part 2: Gmail Integration

To send emails from your Gmail account instead of Resend:

### Step 1: Set Up App Password
1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (required)
3. Search for **App Passwords**
4. Create an app password for "Mail"
5. Copy the 16-character password

### Step 2: Update Edge Function

Replace the Resend email code in `send-contact-email/index.ts` with Gmail SMTP:

```typescript
// Instead of Resend API, use Gmail SMTP
const gmailUser = 'your-email@gmail.com';
const gmailAppPassword = Deno.env.get('GMAIL_APP_PASSWORD');

// Using nodemailer-like approach
const emailConfig = {
  from: gmailUser,
  to: 'your-email@gmail.com',
  subject: `New Contact Form: ${name}`,
  html: emailHtml,
  replyTo: email,
};

// Send via Gmail SMTP (port 587)
// Note: You'll need to use an SMTP library
```

### Step 3: Alternative - Keep Resend, Forward to Gmail

**Recommended approach:** Keep using Resend but forward emails to your Gmail:

1. In Resend dashboard, go to your domain settings
2. Set up email forwarding:
   - Forward: `contact@goldcommercial.com.au`
   - To: `your-email@gmail.com`

OR

Update the Edge Function to send to your Gmail:

```typescript
// In send-contact-email/index.ts, line 98:
to: ['your-email@gmail.com'],  // Change this line
```

---

## Part 3: Simple Solution - Export from Supabase

### Manual Export (No Setup Required)

1. Go to Supabase Dashboard
2. Navigate to **Table Editor** → `contact_submissions`
3. Click **Export** → **CSV**
4. Open CSV in Google Sheets

### Automated Export with Google Sheets Add-on

1. Install **Supermetrics for Google Sheets** or **API Connector**
2. Connect to Supabase via REST API
3. Set up automatic refresh

---

## Recommended Setup

For **simplest and most reliable** setup:

1. ✅ **Keep Resend for email** - Already working
2. ✅ **Use Zapier for Google Sheets** - Takes 5 minutes
3. ✅ **Forward Resend emails to Gmail** - Update Edge Function

### Update Edge Function for Gmail Delivery

```typescript
// Line 98 in send-contact-email/index.ts
to: ['your-gmail@gmail.com'],  // Replace with your Gmail
```

Then redeploy:
- Use the Supabase dashboard to redeploy the function

---

## Benefits of This Approach

✅ **Database backup** - All submissions stored in Supabase
✅ **Email notifications** - Instant alerts via Resend → Gmail
✅ **Spreadsheet tracking** - Automatic Google Sheets sync via Zapier
✅ **No code changes** - Works with existing setup
✅ **Reliable** - Professional tools with 99.9% uptime

---

## Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| Supabase | 500MB database, 2GB bandwidth | $0 |
| Resend | 100 emails/day | $0 |
| Zapier | 100 tasks/month | $0 |
| **Total** | | **$0/month** |

---

## Next Steps

1. **Set up Zapier** (5 minutes)
   - Create Zap: Webhooks → Google Sheets
   - Get webhook URL

2. **Update Edge Function** (2 minutes)
   - Add webhook call to send-contact-email
   - Redeploy function

3. **Change email recipient** (1 minute)
   - Update `to:` field to your Gmail
   - Redeploy function

4. **Test it!**
   - Submit contact form
   - Check Gmail for notification
   - Check Google Sheets for data

---

## Support

Need help? Check these resources:
- Zapier Documentation: https://zapier.com/help
- Supabase Functions: https://supabase.com/docs/guides/functions
- Google Sheets API: https://developers.google.com/sheets

---

## Summary

**Current Status:**
- ✅ Contact forms save to Supabase database
- ✅ Emails sent via Resend API
- ✅ All data stored securely

**Quick Win (5 minutes):**
1. Update Edge Function to send to your Gmail address
2. Set up Zapier to sync to Google Sheets
3. Done! You'll get Gmail notifications + automatic spreadsheet updates

Would you like me to implement any of these changes for you?
