// TypeScript 类型定义

export interface TeamMember {
  id: string;
  name: string;
  photo: string;
  role: 'PI' | 'Postdoc' | 'PhD' | 'Master' | 'Undergraduate' | 'Alumni';
  email: string;
  joinYear: number;
  institution?: string;
  researchFocus: string[];
  homepage?: string;
  googleScholar?: string;
  status: 'Active' | 'Alumni';
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon?: string;
  relatedPapers?: string[];
}

export interface Publication {
  id: string;
  title: string;
  doi: string;
  journal: string;
  year: number;
  authors: string;
  pdfLink?: string;
  category: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  cover?: string;
  source?: string;
  category: 'Award' | 'Publication' | 'Event' | 'Recruitment';
}

export type RoleType = 'PI' | 'Postdoc' | 'PhD' | 'Master' | 'Undergraduate' | 'Alumni';

export const ROLE_ORDER: Record<RoleType, number> = {
  'PI': 1,
  'Postdoc': 2,
  'PhD': 3,
  'Master': 4,
  'Undergraduate': 5,
  'Alumni': 6,
};

export const ROLE_DISPLAY_NAMES: Record<RoleType, string> = {
  'PI': 'Principal Investigator',
  'Postdoc': 'Postdoctoral Researchers',
  'PhD': 'PhD Students',
  'Master': 'Master Students',
  'Undergraduate': 'Undergraduate Students',
  'Alumni': 'Alumni',
};
