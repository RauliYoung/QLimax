import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SG_API_KEY || '');

// In-memory store for OTPs
let otpStore = {};

export const POST = (req, res) => {
  const {email} = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);
  otpStore[email] = otp;

  const msg = {
    to: email,
    from: 'joonas.jouttijarvi@gmail.com',
    subject: 'Your OTP for login',
    text: `Your OTP is ${otp}`,
    html: `<strong>Your OTP is ${otp}</strong>`,
  };
  sgMail.send(msg);

  res.json({status: 'success'});
};
