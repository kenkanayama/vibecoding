export interface SpotifyTrack {
  id: string;
  name: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  duration_ms: number;
  popularity: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  external_urls: {
    spotify: string;
  };
  tracks: {
    total: number;
    items: {
      track: SpotifyTrack;
    }[];
  };
}

export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
    total: number;
  };
  playlists: {
    items: SpotifyPlaylist[];
    total: number;
  };
}

export interface SpotifyAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface MoodMapping {
  mood: string;
  searchQuery: string;
  genre?: string;
  energy?: number;
  valence?: number;
} 