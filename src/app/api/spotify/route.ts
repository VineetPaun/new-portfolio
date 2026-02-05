import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const nowPlaying = await getNowPlaying();

    if (nowPlaying && nowPlaying.isPlaying) {
      return NextResponse.json(nowPlaying, {
        headers: { 'Cache-Control': 'no-store' },
      });
    }

    const recentlyPlayed = await getRecentlyPlayed();

    if (recentlyPlayed) {
      return NextResponse.json(recentlyPlayed, {
        headers: { 'Cache-Control': 'no-store' },
      });
    }

    return NextResponse.json(
      { error: 'No Spotify activity found.' },
      { status: 204 },
    );
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { error: 'Failed to load Spotify activity.' },
      { status: 500 },
    );
  }
}
