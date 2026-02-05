import type { SpotifyTrack } from '@/types/spotify';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT =
  'https://api.spotify.com/v1/me/player/recently-played?limit=1';

type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

type SpotifyImage = {
  url: string;
  height: number | null;
  width: number | null;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyAlbum = {
  name: string;
  images: SpotifyImage[];
};

type SpotifyTrackItem = {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: { spotify: string };
  type: 'track';
};

type SpotifyCurrentlyPlayingResponse = {
  is_playing: boolean;
  item: SpotifyTrackItem | null;
};

type SpotifyRecentlyPlayedResponse = {
  items: Array<{
    played_at: string;
    track: SpotifyTrackItem | null;
  }>;
};

function getAlbumImage(images: SpotifyImage[]): string {
  if (!images?.length) {
    return '';
  }
  return (
    images.find((image) => image.width === 64)?.url ||
    images.find((image) => image.width === 300)?.url ||
    images[0]?.url ||
    ''
  );
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Spotify environment variables are not configured');
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64',
  );

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to refresh Spotify token: ${errorText}`);
  }

  const data = (await response.json()) as SpotifyTokenResponse;
  return data.access_token;
}

async function fetchSpotifyEndpoint<T>(endpoint: string): Promise<T> {
  const accessToken = await getAccessToken();

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (response.status === 204) {
    throw new Error('No Spotify content available');
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Spotify API error: ${errorText}`);
  }

  return (await response.json()) as T;
}

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  try {
    const data = await fetchSpotifyEndpoint<SpotifyCurrentlyPlayingResponse>(
      NOW_PLAYING_ENDPOINT,
    );

    if (!data?.item || data.item.type !== 'track') {
      return null;
    }

    return {
      title: data.item.name,
      artists: data.item.artists.map((artist) => artist.name).join(', '),
      album: data.item.album.name,
      albumImageUrl: getAlbumImage(data.item.album.images),
      songUrl: data.item.external_urls.spotify,
      isPlaying: data.is_playing,
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('No Spotify content')) {
      return null;
    }
    throw error;
  }
}

export async function getRecentlyPlayed(): Promise<SpotifyTrack | null> {
  const data = await fetchSpotifyEndpoint<SpotifyRecentlyPlayedResponse>(
    RECENTLY_PLAYED_ENDPOINT,
  );

  const latest = data.items?.[0];
  if (!latest?.track) {
    return null;
  }

  return {
    title: latest.track.name,
    artists: latest.track.artists.map((artist) => artist.name).join(', '),
    album: latest.track.album.name,
    albumImageUrl: getAlbumImage(latest.track.album.images),
    songUrl: latest.track.external_urls.spotify,
    isPlaying: false,
    playedAt: latest.played_at,
  };
}
