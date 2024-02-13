import { NextRequest } from 'next/server';
import mongoConnect from '@/app/lib/db';
import User from '@/app/models/userModel';
import bcrypt from 'bcrypt';
import createResponseObject from '@/app/lib/createResposeObject';

export async function POST(req: NextRequest) {
  await mongoConnect();

  try {
    const data = await req.json();
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = new User({...data, password: hashedPassword});
    await user.save();

    return createResponseObject({
      status: 200,
      body: { message: 'User saved successfully' }
    });
  } catch (error) {
    console.error('Error:', error);
    return createResponseObject({
      status: 500,
      body: { error: 'Error in saving' }
    });
  }
}

