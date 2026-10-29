export type Theme = 'light' | 'dark';

export type ContentFrontMatter = {
  title: string;
  topic: string;
  tags: string[];
  date: string;
};

export type ContentItem = ContentFrontMatter & {
  slug: string;
  content: string;
  sourcePath: string;
};

export type NoteItem = ContentItem;

export type CheatSheetItem = ContentItem;

export type GlossaryCategory =
  | 'Workflow & DevOps'
  | 'Backend & .NET'
  | 'Frontend & Web'
  | 'Databases'
  | 'Architecture & Patterns'
  | 'Testing'
  | 'Web & Security'
  | 'Agile & Teamwork'
  | 'AI & .NET AI';

export type GlossaryFrontMatter = {
  term: string;
  fullName: string;
  category: GlossaryCategory;
  tags: string[];
  date: string;
};

export type GlossaryItem = GlossaryFrontMatter & {
  slug: string;
  content: string;
  sourcePath: string;
  inShort: string;
};

export type SearchItem = {
  id: string;
  title: string;
  topic: string;
  tags: string[];
  type: 'note' | 'cheatsheet' | 'glossary';
  content: string;
  date: string;
  slug: string;
  fullName?: string;
};

export type TopicMetadata = {
  name: string;
  description?: string;
  icon?: string;
  sortOrder?: number;
};

export type TopicSummary = {
  name: string;
  slug: string;
  count: number;
  description?: string;
  icon?: string;
  sortOrder: number;
};
