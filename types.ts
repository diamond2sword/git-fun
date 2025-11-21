
export interface MVPFlipCard {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  backTitle: string;
  backCode: string;
  colorClass: string;
}

export interface DragItem {
  id: string;
  label: string;
  correctZone: 'show' | 'hide';
}

export interface GalleryItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  codeSnippet: string;
  rarity: 'common' | 'rare' | 'epic';
  stats: { power: number; defense: number };
}

export interface QuizData {
  question: string;
  code: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

export interface GameState {
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  streak: number;
  badges: string[];
  completedQuestIds: number[];
  questProgress: Record<number, { code: string }>;
  widgetState: Record<string, any>;
}

export interface Quest {
  id: number;
  title: string;
  desc: string;
  codeTemplate: string;
  expected: string;
  xp: number;
  reward: string;
  type: 'print' | 'var' | 'math' | 'logic' | 'loop' | 'list';
  visualType?: string;
  solution?: string;
}

export enum WidgetType {
  START_ANIMATION = 'START_ANIMATION',
  TERMS_EXPANDER = 'TERMS_EXPANDER',
  SETUP_TOGGLE = 'SETUP_TOGGLE',
  DATA_TYPES = 'DATA_TYPES',
  OPERATOR_CARDS = 'OPERATOR_CARDS',
  FLOWCHART_PUZZLE = 'FLOWCHART_PUZZLE',
  LOOP_VISUALIZER = 'LOOP_VISUALIZER',
  FUNCTION_BUILDER = 'FUNCTION_BUILDER',
  FINAL_CHECKLIST = 'FINAL_CHECKLIST'
}

// Props for gamified components
export interface GamifiedProps {
  onEarnXp: (amount: number, reason?: string) => void;
  onUnlockBadge?: (badgeId: string) => void;
  onFail?: () => void;
  savedState?: any;
  onSaveState?: (data: any) => void;
}
