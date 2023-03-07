import type { NextRequest, NextResponse } from 'next/server';

const handler = async (req: NextRequest, res: NextResponse) => {
  return fetch(`${process.env.NOTIFICATION_HOST}/vapid_public_key`);
};

export const config = {
  runtime: 'edge',
};

export default handler;
