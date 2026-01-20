
import React from 'react';
import { Quality, Moment, ZodiacItem } from './types';
import { Coffee, Music, Book, Sparkles, Utensils, Globe, Star, Zap, Film } from 'lucide-react';

export const HER_NAME = "Zaara"; 
export const YOUR_NAME = "Someone you inspire";
export const TAGLINE = "In a world of ordinary, she is the definition of extraordinary.";

export const QUALITIES: (Quality & { type: 'binary' | 'galaxy' | 'sun' | 'neutron' | 'spirit' })[] = [
  {
    id: 'laughter',
    title: 'Her Laughter',
    type: 'binary',
    description: "Your laughter is the universe's favorite symphony. A sound that turns any mundane moment into a memory.",
    icon: <Music className="w-6 h-6 text-yellow-400" />,
    position: { x: 25, y: 30 }
  },
  {
    id: 'intelligence',
    title: 'Her Intelligence',
    type: 'galaxy',
    description: "A spiral of depth and curiosity. She sees the patterns others miss, weaving wisdom into every thought.",
    icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
    position: { x: 70, y: 25 }
  },
  {
    id: 'kindness',
    title: 'Her Kindness',
    type: 'sun',
    description: "A warm sun that makes the world feel warm and bright. An effortless grace that inspires everyone.",
    icon: <Sparkles className="w-6 h-6 text-rose-400" />,
    position: { x: 45, y: 60 }
  },
  {
    id: 'strength',
    title: 'Her Strength',
    type: 'neutron',
    description: "Bends with the storm but never breaks. Intense, resonant, and weathering every cosmic storm.",
    icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
    position: { x: 80, y: 70 }
  }
];

export const ZODIAC_ITEMS: ZodiacItem[] = [
  {
    id: 'coffee',
    title: 'Go-to Coffee',
    icon: <Coffee className="w-6 h-6" />,
    color: '#D4A373',
    content: "A perfectly brewed comfort. The morning ritual that fuels her magic."
  },
  {
    id: 'food',
    title: 'Comfort Food',
    icon: <Utensils className="w-6 h-6" />,
    color: '#FFB7B2',
    content: "Ice Cream & Momos: The ultimate recipe for a happy Zaara."
  },
  {
    id: 'destination',
    title: 'Dream Destination',
    icon: <Globe className="w-6 h-6" />,
    color: '#B2E2F2',
    content: "Germany: A future chapter waiting to be written in the streets of Berlin or the Alps."
  },
  {
    id: 'talent',
    title: 'Secret Talent',
    icon: <Zap className="w-6 h-6" />,
    color: '#E0BBE4',
    content: "Dumb and Lazy 😂 (Self-proclaimed, but we know it's actually a talent for effortless coolness)."
  },
  {
    id: 'editing',
    title: 'Editing Talent',
    icon: <Film className="w-6 h-6" />,
    color: '#FFD700',
    content: "My favorite Talent In you Is Editing✨🌙. You turn raw moments into cinematic masterpieces."
  }
];

export const MOMENTS: Moment[] = [
  {
    id: 'convo',
    label: 'That long conversation.',
    description: 'When time seemed to pause and the world outside vanished.',
    icon: <Coffee className="w-8 h-8 text-amber-500" />
  },
  {
    id: 'song',
    label: 'The song you introduced.',
    description: 'Every time it plays, I see a glimpse of the universe through your ears.',
    icon: <Music className="w-8 h-8 text-cyan-500" />
  },
  {
    id: 'story',
    label: 'The story you loved.',
    description: 'A shared chapter that stays with me, much like your presence does.',
    icon: <Book className="w-8 h-8 text-violet-500" />
  }
];
