import mongoConnect from "@/app/lib/db"
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: Request) {
  await mongoConnect();
  // console.log(request)
  
  // const { searchParams } = new URL(request.url);  
  // const wait = Number(searchParams.get('wait'));

  // await new Promise((resolve) => setTimeout(resolve, wait));

  return NextResponse.json("Hello world, is an old message");
}