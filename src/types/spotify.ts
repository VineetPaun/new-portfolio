export interface SpotifyTrack {
  title: string;
  artists: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  isPlaying: boolean;
  playedAt?: string;
}
