'use client';

import { useState } from 'react';
import { Send, Heart, Coffee, Headphones, Sun } from 'lucide-react';

interface MoodInputProps {
  onSubmit: (mood: string) => void;
  isLoading: boolean;
}

const predefinedMoods = [
  { label: 'リラックス', icon: Heart, color: 'from-green-400 to-blue-500' },
  { label: '集中したい', icon: Coffee, color: 'from-yellow-400 to-orange-500' },
  { label: '元気を出したい', icon: Sun, color: 'from-orange-400 to-red-500' },
  { label: '落ち着きたい', icon: Headphones, color: 'from-purple-400 to-pink-500' },
];

export default function MoodInput({ onSubmit, isLoading }: MoodInputProps) {
  const [mood, setMood] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mood.trim() && !isLoading) {
      onSubmit(mood.trim());
    }
  };

  const handlePredefinedMoodClick = (moodLabel: string) => {
    if (!isLoading) {
      setMood(moodLabel);
      onSubmit(moodLabel);
    }
  };

  return (
    <div className="space-y-6">
      {/* プリセット気分ボタン */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {predefinedMoods.map(({ label, icon: Icon, color }) => (
          <button
            key={label}
            onClick={() => handlePredefinedMoodClick(label)}
            disabled={isLoading}
            className={`
              glass-card p-4 flex flex-col items-center space-y-2
              hover:scale-105 transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              group
            `}
          >
            <div className={`p-3 rounded-full bg-gradient-to-r ${color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-sm font-medium group-hover:text-purple-200">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* 自由入力フォーム */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="今の気分や聞きたい音楽のジャンルを入力..."
            disabled={isLoading}
            className="
              w-full px-6 py-4 rounded-lg
              bg-white/20 backdrop-blur-sm border border-white/30
              text-white placeholder-white/60
              focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              text-lg
            "
          />
          <button
            type="submit"
            disabled={!mood.trim() || isLoading}
            className="
              absolute right-2 top-1/2 transform -translate-y-1/2
              p-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600
              text-white disabled:opacity-50 disabled:cursor-not-allowed
              hover:from-purple-700 hover:to-blue-700 transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-purple-400
            "
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-white/60 text-sm text-center">
          例: 「雨の日にぴったりな音楽」「運動中に聞きたい」「寝る前のリラックス」
        </p>
      </form>
    </div>
  );
} 