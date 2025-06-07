'use client';

import { useState, useRef } from 'react';
import { Play, Pause, ExternalLink, Clock, User } from 'lucide-react';
import { SpotifyTrack } from '@/types/spotify';

interface TrackCardProps {
  track: SpotifyTrack;
  index: number;
}

export default function TrackCard({ track, index }: TrackCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = async () => {
    if (!track.preview_url) return;

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing audio:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const openSpotify = () => {
    window.open(track.external_urls.spotify, '_blank');
  };

  return (
    <div 
      className="music-card group"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      {/* アルバムアート */}
      <div className="relative mb-4">
        <img
          src={track.album.images[0]?.url || '/placeholder-album.png'}
          alt={track.album.name}
          className="w-full aspect-square object-cover rounded-lg"
          loading="lazy"
        />
        
        {/* プレビュー再生ボタン */}
        {track.preview_url && (
          <button
            onClick={handlePlayPause}
            disabled={isLoading}
            className="
              absolute inset-0 bg-black/50 rounded-lg
              flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              disabled:opacity-50
            "
          >
            {isLoading ? (
              <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-12 h-12 text-white" />
            ) : (
              <Play className="w-12 h-12 text-white ml-1" />
            )}
          </button>
        )}
        
        {/* プレビュー音声要素 */}
        {track.preview_url && (
          <audio
            ref={audioRef}
            src={track.preview_url}
            onEnded={handleAudioEnd}
            preload="none"
          />
        )}
      </div>

      {/* 楽曲情報 */}
      <div className="space-y-3">
        <div>
          <h4 className="text-white font-semibold text-lg line-clamp-2 mb-1">
            {track.name}
          </h4>
          <p className="text-white/70 text-sm line-clamp-1">
            <User className="w-4 h-4 inline mr-1" />
            {track.artists.map(artist => artist.name).join(', ')}
          </p>
        </div>

        <div className="flex items-center justify-between text-white/60 text-sm">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {formatDuration(track.duration_ms)}
          </span>
          
          <button
            onClick={openSpotify}
            className="
              flex items-center space-x-1 hover:text-green-400 transition-colors
              group/link
            "
          >
            <span className="group-hover/link:underline">Spotifyで聞く</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* プレビューがない場合の注記 */}
        {!track.preview_url && (
          <p className="text-white/50 text-xs text-center">
            プレビューは利用できません
          </p>
        )}
      </div>
    </div>
  );
} 