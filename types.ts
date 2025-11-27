export enum CharacterId {
  WangWei = 'wangwei',
  YuanEr = 'yuaner',
  Player = 'player',
  Narrator = 'narrator'
}

export interface Character {
  id: CharacterId;
  name: string;
  avatarUrl: string;
}

export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  isGrowthMindset: boolean;
}

export interface StoryScene {
  id: string;
  backgroundUrl: string;
  characterId?: CharacterId;
  text: string;
  choices?: Choice[];
  musicTrack?: string;
  specialEffect?: 'rain' | 'gold_glow' | 'fade_black';
}

export interface GameState {
  currentSceneId: string;
  growthScore: number;
  history: string[];
  showFeedback: boolean;
  isThinking: boolean;
}