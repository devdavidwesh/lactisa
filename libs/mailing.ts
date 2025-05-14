import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationCode = async (email: string, token: string, firstName: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verification Code",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #77bb07; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Lactisa Security</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9fafb; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
          <h2 style="color: #111827; margin-top: 0;">Your Verification Code</h2>
          
          <p style="font-size: 16px; line-height: 1.5;">
            Hello ${firstName}, We're sending you this code to verify your email so as to keep your account secure.
          </p>
          
          <div style="background-color: #ffffff; border: 1px dashed #77bb07; padding: 20px; text-align: center; margin: 25px 0; border-radius: 8px;">
            <div style="font-size: 28px; letter-spacing: 5px; color: #111827; font-weight: bold;">${token}</div>
            <p style="font-size: 12px; color: #6b7280; margin-top: 8px;">This code expires in 10 minutes</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.5;">
            Please enter this code in the verification page to complete your registration.
          </p>
        </div>
        
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Lactisa. All rights reserved.</p>
          <p style="margin: 8px 0 0 0;">This is an automated message - please do not reply directly</p>
        </div>
      </div>
    `,
    text: `Lactisa Security Verification\n\nYour verification code is: ${token}\n\nThis code expires in 10 minutes. Please enter it on the verification page to complete your login.\n\nIf you didn't request this code, please secure your account immediately.\n\n© ${new Date().getFullYear()} Lactisa. All rights reserved.`
  });
};


export const sendWelcomeEmail = async (email: string, firstName: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: `Welcome to LACTISA`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <!-- Header with gradient -->
        <div style="background: linear-gradient(135deg, #77bb07 0%, #5a9600 100%); padding: 30px; text-align: center;">
          <img src="https://lactisa.com/logo-white.png" alt="LACTISA Logo" width="120" style="max-width: 120px;">
          <h1 style="color: white; margin: 15px 0 0; font-size: 24px; font-weight: 600;">Welcome to LACTISA!</h1>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px; background-color: #ffffff; border-left: 1px solid #e8e8e8; border-right: 1px solid #e8e8e8;">
          <h2 style="color: #2d3748; margin-top: 0; font-size: 20px;">Dear ${firstName},</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
            Thank you for your application to join the LACTISA community. We're thrilled about your interest in our programs!
          </p>
          
          <!-- Activation Process Card -->
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <div style="background-color: #77bb07; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <span style="color: white; font-weight: bold;">1</span>
              </div>
              <h3 style="color: #2d3748; margin: 0; font-size: 17px;">Account Review in Progress</h3>
            </div>
            <p style="font-size: 15px; color: #4a5568; margin-left: 36px; margin-top: 0;">
              A LACTISA representative will personally review your application and contact you within <strong>2 business days</strong> to complete your account activation.
            </p>
            
            <div style="display: flex; align-items: center; margin: 20px 0 15px;">
              <div style="background-color: #77bb07; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <span style="color: white; font-weight: bold;">2</span>
              </div>
              <h3 style="color: #2d3748; margin: 0; font-size: 17px;">Login Access</h3>
            </div>
            <p style="font-size: 15px; color: #4a5568; margin-left: 36px; margin-top: 0;">
              You'll receive a second email with login instructions once your account has been approved and activated by our team.
            </p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
            In the meantime, we invite you to:
          </p>
          
          <!-- Pre-Activation Actions -->
          <div style="margin-top: 20px; padding: 15px; background-color: #f0fff4; border-left: 4px solid #77bb07; border-radius: 4px;">
            <h4 style="margin-top: 0; color: #2d3748; font-size: 15px;">Prepare for Your Journey:</h4>
            <ul style="padding-left: 20px; margin-bottom: 0;">
              <li style="margin-bottom: 8px;">Explore our <a href="https://lactisa.com/programs" style="color: #77bb07;">program offerings</a> to plan your learning path</li>
              <li style="margin-bottom: 8px;">Follow us on <a href="https://twitter.com/lactisa" style="color: #77bb07;">Twitter</a> for community updates</li>
              <li>Review the <a href="https://lactisa.com/faq" style="color: #77bb07;">FAQ section</a> for common questions</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-top: 25px;">
            Should you have any urgent questions, our support team is available at <a href="mailto:support@lactisa.com" style="color: #77bb07;">support@lactisa.com</a>.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
            We appreciate your patience during this verification process, which helps us maintain the quality and security of our community.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #FFBF00; padding: 20px; text-align: center; font-size: 12px; color: #cbd5e0;">
          <p style="margin: 0;">© ${new Date().getFullYear()} LACTISA. All rights reserved.</p>
          <p style="margin: 8px 0 0 0; font-size: 11px;">This is an automated message - please do not reply directly</p>
          <div style="margin-top: 15px;">
            <a href="https://lactisa.com" style="color: #cbd5e0; text-decoration: none; margin: 0 8px;">Website</a>
            <a href="https://lactisa.com/contact" style="color: #cbd5e0; text-decoration: none; margin: 0 8px;">Contact</a>
            <a href="https://lactisa.com/privacy" style="color: #cbd5e0; text-decoration: none; margin: 0 8px;">Privacy Policy</a>
          </div>
        </div>
      </div>
    `,
    text: `
Welcome to LACTISA, ${firstName}!

Thank you for your application to join the LACTISA community. We're thrilled about your interest in our programs!

ACCOUNT ACTIVATION PROCESS:

1. Account Review in Progress
A LACTISA representative will personally review your application and contact you within 2 business days to complete your account activation.

2. Login Access
You'll receive a second email with login instructions once your account has been approved and activated by our team.

PREPARE FOR YOUR JOURNEY:
- Explore our program offerings: https://lactisa.co.ke/programs
- Follow us on Twitter: https://twitter.com/lactisa
- Review the FAQ section: https://lactisa.com/faq

For urgent questions, contact our support team: support@lactisa.com

We appreciate your patience during this verification process, which helps us maintain the quality and security of our community.

© ${new Date().getFullYear()} LACTISA. All rights reserved.

Website: https://lactisa.co.ke
Contact: https://lactisa.co.ke/contact
Privacy Policy: https://lactisa.co.ke/privacy
    `
  });
};
