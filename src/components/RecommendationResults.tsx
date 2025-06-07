'use client';

import { useState } from 'react';
import { Play, Pause, ExternalLink, Clock, User } from 'lucide-react';
import { SpotifyTrack } from '@/types/spotify';
import TrackCard from '@/components/TrackCard';

interface RecommendationResultsProps {
  tracks: SpotifyTrack[];
  mood: string;
}

export default function RecommendationResults({ tracks, mood }: RecommendationResultsProps) {
  return (
    <div className="space-y-6">
      {/* 結果ヘッダー */}
      <div className="glass-card p-6 text-center">
        <h3 className="text-2xl font-semibold text-white mb-2">
          「{mood}」にぴったりな音楽
        </h3>
        <p className="text-white/70">
          {tracks.length}曲のレコメンドが見つかりました
        </p>
      </div>

      {/* 楽曲リスト */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track, index) => (
          <TrackCard 
            key={track.id} 
            track={track} 
            index={index}
          />
        ))}
      </div>

      {/* 楽曲が見つからない場合 */}
      {tracks.length === 0 && (
        <div className="glass-card p-8 text-center">
          <div className="space-y-4">
            <div className="text-6xl">🎵</div>
            <h3 className="text-xl font-semibold text-white">
              申し訳ございません
            </h3>
            <p className="text-white/70">
              「{mood}」に関連する楽曲が見つかりませんでした。<br />
              別の気分やキーワードでお試しください。
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 