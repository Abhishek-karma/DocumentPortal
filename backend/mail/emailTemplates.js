const generateVerificationEmail = (verificationCode) => {
    return `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Verify Your DocPortal Email</h1>
          </div>
          <div style="padding: 20px;">
            <p>Hello,</p>
            <p>Thank you for signing up! Your verification code is:</p>
            <div style="text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #4CAF50; padding: 10px; border: 2px dashed #4CAF50; display: inline-block;">
              ${verificationCode}
            </div>
            <p>Enter this code on the verification page to complete your registration.</p>
            <p><strong>Note:</strong> This code will expire in 15 minutes for security reasons.</p>
            <p>If you didn't sign up, please ignore this email.</p>
            <p>Best regards,<br><strong>DocPortal Team</strong></p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  const generateWelcomeEmail = (userName) => {
    return `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to DocPortal</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Welcome to DocPortal, ${userName}!</h1>
          </div>
          <div style="padding: 20px;">
            <p>We're excited to have you as part of our community. 🚀</p>
            <p>Start exploring the amazing features DocPortal has to offer. We are here to make your experience smooth and rewarding!</p>
            <p>If you have any questions, feel free to contact us anytime.</p>
            <p>Best regards,<br><strong>DocPortal Team</strong></p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  const generatePasswordResetRequestEmail = (resetURL) => {
    return `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Password Reset Request</h1>
          </div>
          <div style="padding: 20px;">
            <p>Hello,</p>
            <p>We received a request to reset your password for your DocPortal account. Click the button below to reset it:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
            </div>
            <p>If you didn't request this, please ignore this email.</p>
            <p><strong>Note:</strong> This link will expire in 1 hour for security reasons.</p>
            <p>Best regards,<br><strong>DocPortal Team</strong></p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  const generatePasswordResetSuccessEmail = () => {
    return `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
          </div>
          <div style="padding: 20px;">
            <p>Hello,</p>
            <p>Your password has been successfully reset. You can now log in to your DocPortal account with your new password.</p>
            <div style="text-align: center; margin: 30px 0;">
              <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
                ✓
              </div>
            </div>
            <p>If you did not request this change, please contact our support team immediately.</p>
            <p>Best regards,<br><strong>DocPortal Team</strong></p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  export {
    generateVerificationEmail,
    generateWelcomeEmail,
    generatePasswordResetRequestEmail,
    generatePasswordResetSuccessEmail,
  };
  