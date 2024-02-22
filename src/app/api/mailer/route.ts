import createResponseObject from '@/app/lib/createResposeObject';
import SgMail from '@sendgrid/mail';
import {NextRequest} from 'next/server';
import crypto from 'crypto';

SgMail.setApiKey(process.env.SG_API_KEY || '');

const otpStore: Record<string, {otp: string; expires: number}> = {};

async function sendEmail(to: string, subject: string, text: string) {
  const msg = {
    to,
    from: 'qlimax-verification@proton.me',
    subject,
    text,
  };
  try {
    await SgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();
  const {action, email, otp, to} = reqBody;

  if (action === 'generate') {
    const otp = crypto.randomInt(10000, 99999).toString();
    otpStore[email] = {otp, expires: Date.now() + 60000};
    await sendEmail(
      to,
      'Your Qlimax code is here!',
      `Your Qlimax code is: ${otp}. It will expire in 1 minute.`,
    );
    return createResponseObject({status: 200, body: {message: 'Email sent'}});
  } else if (action === 'verify') {
    const storedOtp = otpStore[email];
    if (storedOtp && storedOtp.otp === otp && Date.now() < storedOtp.expires) {
      delete otpStore[email];
      return createResponseObject({
        status: 200,
        body: {message: 'OTP verified'},
      });
    }
    return createResponseObject({status: 400, body: {message: 'Invalid OTP'}});
  }
  return createResponseObject({status: 400, body: {message: 'Invalid action'}});
};
