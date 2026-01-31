export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'Education' | 'Environment' | 'Wellness' | 'Leadership';
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO date string or formatted date
  time: string;
  location: string;
  type: 'Online' | 'Offline';
  description: string;
}

export interface Club {
  id: string;
  name: string;
  location: string;
  members: number;
  lead: string;
}

export interface SpotlightClub {
  name: string;
  location: string;
  description: string;
  image: string;
  month: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatar: string;
}

export interface ColorDef {
  name: string;
  hex: string;
  cmyk: string;
  rgb: string;
  pantone: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface FeaturedItem {
  id: string;
  type: 'Event' | 'Program' | 'Announcement';
  title: string;
  date?: string;
  image: string;
  link: string;
}

export enum YGPTColors {
  Orange = '#F47C20',
  Yellow = '#FDB913',
  Purple = '#936FB1',
  Teal = '#4EB8B9',
  Green = '#00A651',
  DarkGrey = '#333333',
}