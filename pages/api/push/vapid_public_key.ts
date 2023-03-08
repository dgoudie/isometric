import type { NextRequest, NextResponse } from 'next/server';

const handler = async (req: NextRequest, res: NextResponse) => {
  const response = await fetch(
    `${process.env.NOTIFICATION_HOST}/vapid_public_key`
  );
  response.headers.append(
    'cache-control',
    's-maxage=1, stale-while-revalidate=59'
  );
  return response;
};

export const config = {
  runtime: 'edge',
};

export default handler;
