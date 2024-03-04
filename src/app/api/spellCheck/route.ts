import createResponseObject from '@/app/lib/createResposeObject';
import type {NextRequest} from 'next/server';

interface Match {
  offset: number;
  length: number;
}

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const textToCheck = reqBody.text;

    const chunks = textToCheck.match(/.{1,300}/g) || [];
    const languageToolApi = 'https://api.languagetoolplus.com/v2/check';
    let aggregatedData = {matches: []};
    let currentOffset = 0;
    for (const chunk of chunks) {
      const languageToolReqBody = new URLSearchParams({
        text: chunk,
        language: 'en-US',
      });

      const languageToolResponse = await fetch(languageToolApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: languageToolReqBody,
      });

      if (!languageToolResponse.ok) {
        throw new Error('Failed to fetch from LanguageTool API');
      }

      const data = await languageToolResponse.json();
      const adjustedMatches = data.matches.map((match: Match) => ({
        ...match,
        offset: match.offset + currentOffset,
      }));
      aggregatedData.matches = aggregatedData.matches.concat(adjustedMatches);
      currentOffset += chunk.length;
    }

    return createResponseObject({status: 200, body: aggregatedData});
  } catch (error) {
    console.error('Error:', error);
    return createResponseObject({
      status: 500,
      body: {message: 'Internal Server Error'},
    });
  }
};
