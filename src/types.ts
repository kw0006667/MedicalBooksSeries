export interface Section {
  slug: string;
  title: string;
}

export interface Chapter {
  id: string;       // e.g. 'ch01'
  title: string;
  part: number;
  sections: Section[];
}

export interface Part {
  id: number;
  title: string;
  chapterIds: string[];
}

export interface Volume {
  id: string;        // e.g. 'volume-1'
  shortTitle: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  parts: Part[];
  chapters: Chapter[];
}

export interface AppState {
  theme: 'light' | 'dark';
  volumeId: string | null;
  chapterId: string | null;
  sectionSlug: string | null;
  currentSections: Section[];
  sidebarCollapsed: boolean;
  sectionsCollapsed: boolean;
  mobilePanelState: 'closed' | 'drawer' | 'sections';
}

export type RouteType = 'home' | 'book';

export interface Route {
  type: RouteType;
  volumeId?: string;
  chapterId?: string;
  sectionSlug?: string;
}

export interface ChapterContent {
  title: string;
  intro?: string;
  content: string;
}
