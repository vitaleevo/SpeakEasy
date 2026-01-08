
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  xp: number;
  streak: number;
  level: string;
}

export interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  translation?: string;
  timestamp: Date;
  feedback?: {
    accuracy: number;
    corrections: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  topic: string;
  duration: string;
  xp: number;
  type: 'video' | 'audio' | 'article' | 'quiz';
  level: string;
  thumbnail: string;
}

export enum NavigationTab {
  DASHBOARD = 'dashboard',
  COURSES = 'courses',
  AI_CHAT = 'ai-chat',
  COMMUNITY = 'community',
  LIBRARY = 'library',
  PROFILE = 'profile',
  LESSON = 'lesson',
  PRICING = 'pricing',
  SETTINGS = 'settings',
  ABOUT_US = 'about-us'
}
