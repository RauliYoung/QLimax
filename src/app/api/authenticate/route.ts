import { NextRequest } from 'next/server';
import mongoConnect from '@/app/lib/db';
import User from '@/app/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createResponseObject from '@/app/lib/createResposeObject';

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user: any) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '4d',
  });
};

export async function POST(req: NextRequest) {
  await mongoConnect();

  try {
    const data = await req.json();
    const user = await User.findOne({ email: data.email }).exec();

    if (!user) {
      return createResponseObject({
        status: 404,
        body: { error: 'user not found' },
      });
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      return createResponseObject({
        status: 401,
        body: { error: 'Invalid credentials' },
      });
    }
    const token = generateToken(user);

    return createResponseObject({ status: 200, body: { token } });
  } catch (error) {
    return createResponseObject({
      status: 500,
      body: { error: 'Error in authentication' },
    });
  }
}
