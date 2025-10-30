import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const RESEND_API_KEY = 're_VuPua782_7yYmepQPA73i64HXnELZvquW';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface OTPRequest {
  email: string;
  action: 'send' | 'verify' | 'reset';
  otp?: string;
  newPassword?: string;
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, action, otp, newPassword }: OTPRequest = await req.json();

    if (!email || !action) {
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

    if (action === 'send') {
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (!adminUser) {
        return new Response(
          JSON.stringify({ error: "Email not found" }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const otpCode = generateOTP();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      const { error: otpError } = await supabase
        .from('password_reset_otps')
        .insert([{
          email,
          otp_code: otpCode,
          expires_at: expiresAt.toISOString(),
          ip_address: ipAddress,
          user_agent: userAgent,
        }]);

      if (otpError) {
        console.error('OTP storage error:', otpError);
        return new Response(
          JSON.stringify({ error: "Failed to generate OTP" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #8b7355; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9f9f9; padding: 40px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; }
              .otp-box { background-color: white; padding: 30px; border-radius: 8px; text-align: center; margin: 30px 0; border: 2px dashed #8b7355; }
              .otp-code { font-size: 36px; font-weight: bold; color: #8b7355; letter-spacing: 8px; font-family: monospace; }
              .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
              .footer { text-align: center; margin-top: 20px; padding: 15px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">🔐 Password Reset OTP</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Gold Commercial Admin</p>
              </div>
              <div class="content">
                <p style="font-size: 16px; margin-bottom: 20px;">Hello,</p>
                <p style="font-size: 16px; margin-bottom: 20px;">
                  You requested to reset your password. Use the OTP code below to complete the process:
                </p>
                
                <div class="otp-box">
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #666; text-transform: uppercase;">Your OTP Code</p>
                  <div class="otp-code">${otpCode}</div>
                  <p style="margin: 15px 0 0 0; font-size: 12px; color: #999;">Valid for 5 minutes</p>
                </div>

                <div class="warning">
                  <p style="margin: 0; font-size: 14px;">
                    <strong>⚠️ Security Notice:</strong><br>
                    • This OTP expires in 5 minutes<br>
                    • Do not share this code with anyone<br>
                    • If you didn't request this, ignore this email
                  </p>
                </div>

                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  If you're having trouble, contact support.
                </p>
              </div>
              <div class="footer">
                <p>This is an automated email from Gold Commercial Admin Panel.</p>
                <p>© ${new Date().getFullYear()} Gold Commercial. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Gold Commercial <onboarding@resend.dev>',
            to: [email],
            subject: '🔐 Your Password Reset OTP Code',
            html: emailHtml,
          }),
        });

        if (!response.ok) {
          console.error('Resend API error:', await response.text());
          return new Response(
            JSON.stringify({ error: "Failed to send OTP email" }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: "OTP sent to your email",
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (emailError) {
        console.error('Email error:', emailError);
        return new Response(
          JSON.stringify({ error: "Failed to send OTP email" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    if (action === 'verify') {
      if (!otp) {
        return new Response(
          JSON.stringify({ error: "OTP code required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: otpRecord } = await supabase
        .from('password_reset_otps')
        .select('*')
        .eq('email', email)
        .eq('otp_code', otp)
        .eq('used', false)
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!otpRecord) {
        return new Response(
          JSON.stringify({ error: "Invalid or expired OTP" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "OTP verified successfully",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === 'reset') {
      if (!otp || !newPassword) {
        return new Response(
          JSON.stringify({ error: "OTP and new password required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: otpRecord } = await supabase
        .from('password_reset_otps')
        .select('*')
        .eq('email', email)
        .eq('otp_code', otp)
        .eq('used', false)
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!otpRecord) {
        return new Response(
          JSON.stringify({ error: "Invalid or expired OTP" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (!adminUser) {
        return new Response(
          JSON.stringify({ error: "User not found" }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { error: updateError } = await supabase.auth.admin.updateUserById(
        adminUser.id,
        { password: newPassword }
      );

      if (updateError) {
        console.error('Password update error:', updateError);
        return new Response(
          JSON.stringify({ error: "Failed to update password" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      await supabase
        .from('password_reset_otps')
        .update({ used: true })
        .eq('id', otpRecord.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Password reset successfully",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      {
        status: 400,
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