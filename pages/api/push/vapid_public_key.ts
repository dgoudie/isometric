import type { NextRequest, NextResponse } from 'next/server';

const handler = async (req: NextRequest, res: NextResponse) => {
  const response = await fetch(
    `${process.env.NOTIFICATION_HOST}/vapid_public_key`
  );
  if (!response.ok) {
    return response;
  }
  const clonedResponse = response.clone();
  clonedResponse.headers.append(
    'cache-control',
    's-maxage=1, stale-while-revalidate=59'
  );
  return clonedResponse;
};

export const config = {
  runtime: 'edge',
};

export default handler;
