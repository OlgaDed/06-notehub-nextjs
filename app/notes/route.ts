import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const res = await fetch('https://notes-api.goit.global/notes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  const data = await res.json();
  return NextResponse.json(data);
}
