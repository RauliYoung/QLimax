import {NextRequest, NextResponse} from 'next/server';
import mongoConnect from '@/app/lib/db';
import User from '@/app/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user: any) => {
  return jwt.sign({id: user._id, email: user.email}, JWT_SECRET, {
    expiresIn: '4d',
  });
};

export async function POST(req: NextRequest) {
  await mongoConnect();

  try {
    const data = await req.json();
    const user = await User.findOne({email: data.email}).exec();

    if (!user) {
      return new NextResponse(JSON.stringify({error: 'user not found'}), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      return new NextResponse(JSON.stringify({error: 'Invalid credentialss'}), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    const token = generateToken(user);

    return new NextResponse(JSON.stringify({token}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return new NextResponse(
      JSON.stringify({error: 'Error in authentication'}),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
