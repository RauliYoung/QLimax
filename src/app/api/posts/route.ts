import mongoConnect from "@/app/lib/db"
import { NextRequest, NextResponse } from "next/server";


const POST = async (request: NextRequest) => {
  try {
    await mongoConnect
    const reqBody = await request.json();
    const textToCheck = reqBody.text;
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
