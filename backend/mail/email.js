import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  generateVerificationEmail,
  generateWelcomeEmail,
  generatePasswordResetRequestEmail,
  generatePasswordResetSuccessEmail,
} from "../mail/emailTemplates.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"DocPortal" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error(` Error sending email to ${to}:`, error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Send verification email
export const sendVerificationEmail = async (email, name, verificationToken) => {
  const emailContent = generateVerificationEmail(verificationToken);
  return sendEmail({
    to: email,
    subject: "Verify Your Email",
    html: emailContent,
  });
};

// Send welcome email
export const sendWelcomeEmail = async (email, name) => {
  const emailContent = generateWelcomeEmail(name);
  return sendEmail({
    to: email,
    subject: "Welcome to DocPortal",
    html: emailContent,
  });
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetURL) => {
  const emailContent = generatePasswordResetRequestEmail(resetURL);
  return sendEmail({
    to: email,
    subject: "Reset Your Password",
    html: emailContent,
  });
};

// Send reset success email
export const sendResetSuccessEmail = async (email) => {
  const emailContent = generatePasswordResetSuccessEmail();
  return sendEmail({
    to: email,
    subject: "Password Reset Successful",
    html: emailContent,
  });
};
