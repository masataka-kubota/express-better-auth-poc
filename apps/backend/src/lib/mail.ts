import { Resend } from 'resend';

import { env, isDev } from '@/lib/env';

export interface SendEmailOptions {
  /** Recipient email address. */
  to: string;
  /** Subject of the email. */
  subject: string;
  /** HTML content of the email. Used as primary content. */
  html?: string;
  /** Plain text fallback. Used when html is not provided. */
  text?: string;
}

/**
 * Sends an email using either Mailpit (in development) or Resend (in production).
 *
 * `html` is used as primary content. `text` is used as fallback
 * (e.g. when the recipient's email client doesn't render HTML).
 */
export const sendEmail = async ({ to, subject, html, text }: SendEmailOptions) => {
  const content = html ?? text;
  if (!content) {
    throw new Error('Either html or text must be provided');
  }

  if (isDev) {
    // In development, send email to local Mailpit server via nodemailer.
    // Use the container-friendly mailpit hostname when running inside a container,
    // and localhost for host-based runs.
    const { default: nodemailer } = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.IN_CONTAINER === 'true' ? 'mailpit' : 'localhost',
      port: 1025,
      secure: false
    });
    await transporter.sendMail({
      from: env.smtpFrom,
      to,
      subject,
      html,
      text
    });
  } else {
    // In production, send email using Resend API
    if (!env.resendApiKey) {
      throw new Error(
        '❌ RESEND_API_KEY is required in production.Please set the RESEND_API_KEY environment variable.'
      );
    }

    const resend = new Resend(env.resendApiKey);
    await resend.emails.send({
      from: env.smtpFrom,
      to,
      subject,
      ...(html ? { html } : {}),
      ...(text ? { text } : {})
    } as Parameters<typeof resend.emails.send>[0]);
  }
};
