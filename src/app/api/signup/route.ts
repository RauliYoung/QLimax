import { NextRequest, NextResponse } from 'next/server';
import mongoConnect from '@/app/lib/db';
import User from '@/app/models/userModel';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  await mongoConnect();

  try {
    const data = await req.json();
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = new User({...data, password: hashedPassword});
    await user.save();

    return new NextResponse(
      JSON.stringify({ message: 'User saved successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Error in saving' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
