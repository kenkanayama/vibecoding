import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyAccessToken, searchSpotifyTracks } from '@/lib/spotify';
import { getMoodMapping } from '@/lib/moodMapping';

export async function POST(req: NextRequest) {
  try {
    const { mood } = await req.json();

    if (!mood || typeof mood !== 'string') {
      return NextResponse.json(
        { error: '気分の入力が必要です' },
        { status: 400 }
      );
    }

    // 気分をSpotify検索クエリにマッピング
    const searchQuery = getMoodMapping(mood);

    // Spotifyアクセストークンを取得
    const accessToken = await getSpotifyAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Spotify認証に失敗しました' },
        { status: 500 }
      );
    }

    // Spotifyから楽曲を検索
    const tracks = await searchSpotifyTracks(searchQuery, accessToken);

    return NextResponse.json({
      tracks,
      mood,
      searchQuery
    });

  } catch (error) {
    console.error('Error in recommend API:', error);
    return NextResponse.json(
      { error: 'レコメンドの取得に失敗しました' },
      { status: 500 }
    );
  }
} 