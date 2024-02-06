import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const textToCheck = reqBody.text;

    const languageToolApi = 'https://api.languagetoolplus.com/v2/check';
    
    const languageToolReqBody = new URLSearchParams({
      text: textToCheck,
      language: 'en-US' 
    });
    const languageToolResponse = await fetch(languageToolApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: languageToolReqBody
    });
    if (!languageToolResponse.ok) {
      throw new Error('Failed to fetch from LanguageTool API');
    }
    const data = await languageToolResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

