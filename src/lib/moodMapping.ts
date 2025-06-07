import { MoodMapping } from '@/types/spotify';

// 気分キーワードとSpotify検索クエリのマッピング
const moodMappings: MoodMapping[] = [
  // リラックス系
  { mood: 'リラックス', searchQuery: 'chill ambient relaxing music', genre: 'ambient' },
  { mood: 'のんびり', searchQuery: 'lo-fi chill peaceful music', genre: 'lo-fi' },
  { mood: '落ち着く', searchQuery: 'calm peaceful meditation music', genre: 'new-age' },
  { mood: '癒し', searchQuery: 'healing spa relaxation music', genre: 'ambient' },
  { mood: '寝る前', searchQuery: 'sleep night time peaceful music', genre: 'ambient' },
  
  // エネルギッシュ系
  { mood: '元気', searchQuery: 'upbeat energetic happy music', genre: 'pop', energy: 0.8, valence: 0.8 },
  { mood: 'やる気', searchQuery: 'motivational workout energetic music', genre: 'electronic', energy: 0.9 },
  { mood: 'テンション上がる', searchQuery: 'party dance upbeat music', genre: 'dance', energy: 0.9 },
  { mood: '楽しい', searchQuery: 'fun happy party music', genre: 'pop', valence: 0.8 },
  { mood: 'ポジティブ', searchQuery: 'positive uplifting music', genre: 'pop', valence: 0.8 },
  
  // 集中系
  { mood: '集中', searchQuery: 'focus study instrumental music', genre: 'instrumental' },
  { mood: '勉強', searchQuery: 'study classical piano instrumental', genre: 'classical' },
  { mood: '作業', searchQuery: 'work focus productivity music', genre: 'instrumental' },
  { mood: 'カフェ', searchQuery: 'cafe coffee shop jazz acoustic', genre: 'jazz' },
  
  // 感情系
  { mood: '悲しい', searchQuery: 'sad melancholic emotional music', valence: 0.2 },
  { mood: 'せつない', searchQuery: 'nostalgic melancholic ballad', genre: 'indie' },
  { mood: '感動', searchQuery: 'emotional inspiring cinematic music', genre: 'soundtrack' },
  { mood: 'ロマンチック', searchQuery: 'romantic love ballad music', genre: 'soul' },
  
  // 天気・時間・季節系
  { mood: '雨', searchQuery: 'rainy day lo-fi cozy music', genre: 'lo-fi' },
  { mood: '晴れ', searchQuery: 'sunny bright happy music', genre: 'indie-pop', valence: 0.8 },
  { mood: '夜', searchQuery: 'night time chill atmospheric music', genre: 'electronic' },
  { mood: '朝', searchQuery: 'morning bright acoustic music', genre: 'folk', valence: 0.7 },
  { mood: '春', searchQuery: 'spring fresh indie pop music', genre: 'indie-pop' },
  { mood: '夏', searchQuery: 'summer beach tropical music', genre: 'reggae' },
  { mood: '秋', searchQuery: 'autumn fall acoustic folk music', genre: 'folk' },
  { mood: '冬', searchQuery: 'winter cozy warm acoustic music', genre: 'indie-folk' },
  
  // 運動・活動系
  { mood: '運動', searchQuery: 'workout gym fitness music', genre: 'electronic', energy: 0.9 },
  { mood: 'ランニング', searchQuery: 'running cardio high energy music', genre: 'edm', energy: 0.9 },
  { mood: 'ヨガ', searchQuery: 'yoga meditation peaceful music', genre: 'new-age' },
  { mood: 'ドライブ', searchQuery: 'driving road trip music', genre: 'rock' },
  
  // ジャンル指定
  { mood: 'ジャズ', searchQuery: 'jazz smooth saxophone piano', genre: 'jazz' },
  { mood: 'クラシック', searchQuery: 'classical orchestra piano violin', genre: 'classical' },
  { mood: 'ロック', searchQuery: 'rock guitar energetic music', genre: 'rock' },
  { mood: 'ポップ', searchQuery: 'pop catchy mainstream music', genre: 'pop' },
  { mood: 'エレクトロニック', searchQuery: 'electronic synthesizer dance music', genre: 'electronic' },
  { mood: 'アコースティック', searchQuery: 'acoustic guitar singer-songwriter music', genre: 'acoustic' },
];

// デフォルトの検索クエリ
const DEFAULT_SEARCH_QUERY = 'popular japanese music';

/**
 * 気分を Spotify 検索クエリにマッピングする
 */
export function getMoodMapping(mood: string): string {
  // 完全一致を最初にチェック
  const exactMatch = moodMappings.find(mapping => 
    mapping.mood.toLowerCase() === mood.toLowerCase()
  );
  
  if (exactMatch) {
    return exactMatch.searchQuery;
  }
  
  // 部分一致をチェック
  const partialMatch = moodMappings.find(mapping => 
    mood.toLowerCase().includes(mapping.mood.toLowerCase()) ||
    mapping.mood.toLowerCase().includes(mood.toLowerCase())
  );
  
  if (partialMatch) {
    return partialMatch.searchQuery;
  }
  
  // キーワードベースの推測
  const lowerMood = mood.toLowerCase();
  
  if (lowerMood.includes('リラックス') || lowerMood.includes('休憩') || lowerMood.includes('癒し')) {
    return 'chill ambient relaxing music';
  }
  
  if (lowerMood.includes('元気') || lowerMood.includes('楽しい') || lowerMood.includes('明るい')) {
    return 'upbeat happy energetic music';
  }
  
  if (lowerMood.includes('集中') || lowerMood.includes('勉強') || lowerMood.includes('作業')) {
    return 'focus study instrumental music';
  }
  
  if (lowerMood.includes('悲しい') || lowerMood.includes('辛い') || lowerMood.includes('切ない')) {
    return 'sad melancholic emotional music';
  }
  
  if (lowerMood.includes('雨') || lowerMood.includes('曇り')) {
    return 'rainy day cozy music';
  }
  
  if (lowerMood.includes('運動') || lowerMood.includes('ジム') || lowerMood.includes('トレーニング')) {
    return 'workout fitness high energy music';
  }
  
  // どれにも当てはまらない場合は、入力をそのまま検索クエリとして使用
  return mood || DEFAULT_SEARCH_QUERY;
}

/**
 * 気分に基づいて推奨されるジャンルを取得
 */
export function getRecommendedGenres(mood: string): string[] {
  const mapping = moodMappings.find(m => 
    m.mood.toLowerCase() === mood.toLowerCase() ||
    mood.toLowerCase().includes(m.mood.toLowerCase())
  );
  
  if (mapping && mapping.genre) {
    return [mapping.genre];
  }
  
  // デフォルトの人気ジャンル
  return ['pop', 'indie', 'electronic'];
}

/**
 * 気分に基づいて音楽の属性を取得
 */
export function getMoodAttributes(mood: string): {
  energy?: number;
  valence?: number;
  danceability?: number;
  acousticness?: number;
} {
  const mapping = moodMappings.find(m => 
    m.mood.toLowerCase() === mood.toLowerCase()
  );
  
  if (mapping) {
    return {
      energy: mapping.energy,
      valence: mapping.valence
    };
  }
  
  return {};
} 