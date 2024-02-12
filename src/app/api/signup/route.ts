import { NextRequest, NextResponse } from 'next/server';
import mongoConnect from '@/app/lib/db';
import User from '@/app/models/userModel';

export async function POST(req: NextRequest) {
  await mongoConnect();

  try {
    const data = await req.json();
    const user = new User(data);
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
