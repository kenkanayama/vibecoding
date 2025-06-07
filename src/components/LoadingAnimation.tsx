'use client';

import { Music, Disc, Radio } from 'lucide-react';

export default function LoadingAnimation() {
  return (
    <div className="glass-card p-8 flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        {/* 回転するディスク */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-spin">
          <div className="w-full h-full rounded-full border-4 border-white/30 flex items-center justify-center">
            <Disc className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* 浮遊する音楽アイコン */}
        <div className="absolute -top-2 -right-2 animate-bounce">
          <Music className="w-6 h-6 text-purple-300" />
        </div>
        <div className="absolute -bottom-2 -left-2 animate-bounce delay-150">
          <Radio className="w-6 h-6 text-pink-300" />
        </div>
      </div>
      
      {/* ローディングテキスト */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-white">
          あなたにぴったりの音楽を探しています...
        </h3>
        <p className="text-white/70">
          Spotifyから最適な楽曲をレコメンド中
        </p>
      </div>
      
      {/* 波形アニメーション */}
      <div className="flex space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-1 bg-gradient-to-t from-purple-600 to-blue-400 rounded-full animate-pulse`}
            style={{
              height: `${20 + (i % 3) * 10}px`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );
} 