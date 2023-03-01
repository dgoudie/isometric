import type { NextFetchEvent, NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getAlbum() {
  await wait(120000);
  const res = await fetch('https://isometric.goudie.dev/api/build_id');
  return res.json();
}

export default function MyEdgeFunction(
  request: NextRequest,
  context: NextFetchEvent
) {
  context.waitUntil(getAlbum().then((json) => console.log({ json })));

  return NextResponse.json({
    name: `Hello, from ${request.url} I'm an Edge Function!`,
  });
}
