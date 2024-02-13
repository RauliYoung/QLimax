import { NextResponse } from 'next/server';

interface ResponseOptions {
  status: number;
  body: any;
  headers?: Record<string, string>;
}

export default function createResponseObject({ status, body, headers = { 'Content-Type': 'application/json' } }: ResponseOptions): NextResponse {
  return new NextResponse(JSON.stringify(body), { status, headers });
}
