"use server"
import { Resend } from 'resend';

export async function sendEmail() { 
const resend = new Resend(process.env.RESEND_MAIL_API);

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'claimbrother@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
}