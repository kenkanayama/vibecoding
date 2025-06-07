import { SpotifyTrack, SpotifyAuthResponse, SpotifySearchResponse } from '@/types/spotify';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search';

export async function getSpotifyAccessToken(): Promise<string | null> {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    console.error('Spotify credentials not configured');
    return null;
  }

  try {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      throw new Error(`Spotify auth failed: ${response.status}`);
    }

    const data: SpotifyAuthResponse = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    return null;
  }
}

export async function searchSpotifyTracks(
  query: string, 
  accessToken: string,
  limit: number = 12
): Promise<SpotifyTrack[]> {
  try {
    const params = new URLSearchParams({
      q: query,
      type: 'track',
      limit: limit.toString(),
      market: 'JP'
    });

    const response = await fetch(`${SPOTIFY_SEARCH_URL}?${params}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Spotify search failed: ${response.status}`);
    }

    const data: SpotifySearchResponse = await response.json();
    return data.tracks.items;
  } catch (error) {
    console.error('Error searching Spotify tracks:', error);
    return [];
  }
}

export async function getRecommendations(
  seedGenres: string[],
  targetAttributes: {
    energy?: number;
    valence?: number;
    danceability?: number;
    acousticness?: number;
  },
  accessToken: string,
  limit: number = 12
): Promise<SpotifyTrack[]> {
  try {
    const params = new URLSearchParams({
      seed_genres: seedGenres.join(','),
      limit: limit.toString(),
      market: 'JP'
    });

    // ターゲット属性を追加
    Object.entries(targetAttributes).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(`target_${key}`, value.toString());
      }
    });

    const response = await fetch(`https://api.spotify.com/v1/recommendations?${params}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Spotify recommendations failed: ${response.status}`);
    }

    const data = await response.json();
    return data.tracks || [];
  } catch (error) {
    console.error('Error getting Spotify recommendations:', error);
    return [];
  }
} 