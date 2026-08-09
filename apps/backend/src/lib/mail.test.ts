import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  isDev: true,
  createTransport: vi.fn(() => ({ sendMail: vi.fn().mockResolvedValue(undefined) })),
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: vi.fn().mockResolvedValue(undefined) } };
  })
}));

vi.mock('nodemailer', () => ({
  default: { createTransport: state.createTransport }
}));

vi.mock('resend', () => ({
  Resend: state.Resend
}));

const loadMail = async () => {
  vi.resetModules();
  vi.doMock('@/lib/env', () => ({
    env: { resendApiKey: 'test-key', smtpFrom: 'noreply@localhost' },
    isDev: state.isDev
  }));
  return import('@/lib/mail');
};

type SendMail = typeof import('@/lib/mail').sendEmail;
type SendEmailOptions = Parameters<SendMail>[0];
type Transporter = { sendMail: (mail: SendEmailOptions) => Promise<void> };
type ResendInstance = { emails: { send: (mail: SendEmailOptions) => Promise<void> } };

/**
 * Gets the last created nodemailer transport instance.
 */
const getLastTransport = () => {
  const lastCall =
    state.createTransport.mock.results[state.createTransport.mock.results.length - 1];
  return lastCall?.value as Transporter;
};

/**
 * Gets the last created Resend instance.
 */
const getLastResendInstance = () => {
  const lastCall = state.Resend.mock.results[state.Resend.mock.results.length - 1];
  return lastCall?.value as ResendInstance;
};

describe('sendEmail', () => {
  let sendEmail: SendMail;

  beforeEach(async () => {
    state.isDev = true;
    state.createTransport.mockReset();
    state.Resend.mockReset();
    state.createTransport.mockImplementation(() => ({
      sendMail: vi.fn().mockResolvedValue(undefined)
    }));
    state.Resend.mockImplementation(function () {
      return { emails: { send: vi.fn().mockResolvedValue(undefined) } };
    });
    ({ sendEmail } = await loadMail());
  });

  afterEach(() => {
    state.isDev = true;
    process.env.IN_CONTAINER = undefined;
  });

  it('throws when no content is provided', async () => {
    await expect(sendEmail({ to: 'user@example.com', subject: 'Hi' })).rejects.toThrow(
      'Either html or text must be provided'
    );
  });

  it('uses Mailpit through nodemailer in development mode', async () => {
    await sendEmail({ to: 'user@example.com', subject: 'Hi', html: '<p>Hello</p>' });

    expect(state.createTransport).toHaveBeenCalledWith({
      host: 'localhost',
      port: 1025,
      secure: false
    });

    const transporter = getLastTransport();
    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: 'Better Auth <noreply@localhost>',
      to: 'user@example.com',
      subject: 'Hi',
      html: '<p>Hello</p>',
      text: undefined
    });
  });

  it('uses Mailpit hostname when IN_CONTAINER is true', async () => {
    process.env.IN_CONTAINER = 'true';

    const { sendEmail: sendEmailInContainer } = await loadMail();

    await sendEmailInContainer({
      to: 'user@example.com',
      subject: 'Hi',
      html: '<p>Hello</p>'
    });

    expect(state.createTransport).toHaveBeenCalledWith({
      host: 'mailpit',
      port: 1025,
      secure: false
    });
  });

  it('uses nodemailer for text-only content', async () => {
    await expect(
      sendEmail({ to: 'user@example.com', subject: 'Hi', text: 'Hello' })
    ).resolves.toBeUndefined();

    expect(state.createTransport).toHaveBeenCalledTimes(1);
  });

  it('uses Resend in production mode', async () => {
    state.isDev = false;
    const { sendEmail: sendEmailProd } = await loadMail();

    await sendEmailProd({
      to: 'user@example.com',
      subject: 'Hi',
      html: '<p>Hello</p>',
      text: 'Hello'
    });

    expect(state.Resend).toHaveBeenCalledWith('test-key');

    const instance = getLastResendInstance();
    expect(instance.emails.send).toHaveBeenCalledWith({
      from: 'noreply@localhost',
      to: 'user@example.com',
      subject: 'Hi',
      html: '<p>Hello</p>',
      text: 'Hello'
    });
  });

  it('throws in production mode when the Resend API key is missing', async () => {
    state.isDev = false;
    vi.resetModules();
    vi.doMock('@/lib/env', () => ({
      env: { resendApiKey: undefined, smtpFrom: 'noreply@localhost' },
      isDev: state.isDev
    }));
    const { sendEmail: sendEmailProd } = await import('@/lib/mail');

    await expect(
      sendEmailProd({ to: 'user@example.com', subject: 'Hi', html: '<p>Hello</p>' })
    ).rejects.toThrow('RESEND_API_KEY is required in production');
  });

  it('omits empty html and text fields in production mode', async () => {
    state.isDev = false;
    const { sendEmail: sendEmailProd } = await loadMail();

    await sendEmailProd({ to: 'user@example.com', subject: 'Hi', html: '<p>Hello</p>' });

    const instance = getLastResendInstance();
    expect(instance.emails.send).toHaveBeenCalledWith({
      from: 'noreply@localhost',
      to: 'user@example.com',
      subject: 'Hi',
      html: '<p>Hello</p>'
    });
  });
});
