'use client';

import type { SpotifyTrack } from '@/types/spotify';
import { SpotifyLogo } from '@phosphor-icons/react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import PlayCircle from '../svgs/PlayCircle';

const REFRESH_INTERVAL = 60_000;

type LoadStatus = 'idle' | 'loading' | 'ready' | 'error';

export default function SpotifyCard() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [status, setStatus] = useState<LoadStatus>('idle');

  useEffect(() => {
    let isMounted = true;

    const load = async (initial = false) => {
      if (initial) {
        setStatus('loading');
      }

      try {
        const response = await fetch('/api/spotify', { cache: 'no-store' });

        if (!isMounted) {
          return;
        }

        if (response.status === 204) {
          setTrack(null);
          setStatus('ready');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to load Spotify data');
        }

        const data = (await response.json()) as SpotifyTrack;
        setTrack(data);
        setStatus('ready');
      } catch (error) {
        if (!isMounted) {
          return;
        }
        console.error('Spotify client error:', error);
        setStatus('error');
      }
    };

    load(true);
    const interval = setInterval(() => load(false), REFRESH_INTERVAL);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const label = track?.isPlaying ? 'Now playing' : 'Last played';
  const title =
    track?.title ||
    (status === 'error' ? 'Spotify unavailable' : 'No recent activity');
  const subtitle = track?.artists
    ? `by ${track.artists}`
    : status === 'error'
      ? 'Unable to load Spotify data'
      : 'Play something to show it here';

  if (status === 'loading' && !track) {
    return (
      <div className="mt-6 w-full">
        <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.03] p-2.5 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
          <div className="h-14 w-14 animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 w-16 animate-pulse rounded bg-black/10 dark:bg-white/10" />
            <div className="h-3.5 w-40 animate-pulse rounded bg-black/10 dark:bg-white/10" />
            <div className="h-2.5 w-32 animate-pulse rounded bg-black/10 dark:bg-white/10" />
          </div>
          <div className="h-8 w-8 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 w-full">
      <div className="group flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.03] p-2.5 transition hover:bg-black/[0.05] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]">
        {/* Album Art / Spotify Logo */}
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-black/10 dark:bg-white/10">
          {track?.albumImageUrl ? (
            <Image
              src={track.albumImageUrl}
              alt={track.album}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#1a1a1a]">
              <SpotifyLogo className="h-7 w-7 text-[#1DB954]" weight="fill" />
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[11px] text-secondary">
            <SpotifyLogo className="h-3.5 w-3.5 text-[#1DB954]" weight="fill" />
            <span className="font-medium">{label}</span>
            {track?.isPlaying && (
              <span className="h-1.5 w-1.5 rounded-full bg-[#1DB954] shadow-[0_0_6px_rgba(29,185,84,0.6)]" />
            )}
          </div>
          <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
            {title}
          </p>
          <p className="truncate text-xs text-secondary">{subtitle}</p>
        </div>

        {/* Play Button */}
        {track?.songUrl ? (
          <Link
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label={`Play ${track.title} on Spotify`}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-foreground/70 transition hover:text-foreground dark:text-white/70 dark:hover:text-white"
          >
            <PlayCircle className="h-6 w-6" />
          </Link>
        ) : (
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-secondary/50">
            <PlayCircle className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
