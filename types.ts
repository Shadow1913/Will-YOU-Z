
export interface Quality {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
}

export interface Moment {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export interface ZodiacItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  color: string;
}

export enum AppStage {
  VEIL = 'veil',
  MAIN = 'main',
  DEDICATION = 'dedication',
  CLOSURE = 'closure'
}
