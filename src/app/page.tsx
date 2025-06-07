'use client';

import { useState } from 'react';
import { Music, Search, Sparkles } from 'lucide-react';
import { SpotifyTrack } from '@/types/spotify';
import MoodInput from '@/components/MoodInput';
import RecommendationResults from '@/components/RecommendationResults';
import LoadingAnimation from '@/components/LoadingAnimation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<SpotifyTrack[]>([]);
  const [currentMood, setCurrentMood] = useState('');

  const handleMoodSubmit = async (mood: string) => {
    setIsLoading(true);
    setCurrentMood(mood);
    
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) {
        throw new Error('レコメンドの取得に失敗しました');
      }

      const data = await response.json();
      setRecommendations(data.tracks || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // エラーハンドリング（固定レコメンドを表示）
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* ヘッダー */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Music className="w-12 h-12 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold gradient-text text-shadow">
              VibeFM
            </h1>
            <Sparkles className="w-12 h-12 text-pink-400 animate-pulse" />
          </div>
          <p className="text-xl text-white/80 text-shadow max-w-2xl mx-auto">
            あなたの気分や感情に基づいて、最適な音楽をSpotifyからレコメンド
          </p>
        </div>

        {/* 気分入力セクション */}
        <div className="glass-card p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">
              今の気分を教えてください
            </h2>
            <p className="text-white/70">
              「リラックス」「元気を出したい」「集中したい」など、自由に入力してください
            </p>
          </div>
          
          <MoodInput onSubmit={handleMoodSubmit} isLoading={isLoading} />
        </div>

        {/* ローディング */}
        {isLoading && (
          <div className="flex justify-center">
            <LoadingAnimation />
          </div>
        )}

        {/* レコメンド結果 */}
        {!isLoading && recommendations.length > 0 && (
          <RecommendationResults 
            tracks={recommendations} 
            mood={currentMood}
          />
        )}

        {/* フッター */}
        <div className="text-center text-white/60 text-sm">
          <p>Powered by Spotify Web API</p>
        </div>
      </div>
    </main>
  );
} 