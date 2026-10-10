import MiniSearch from 'minisearch';
import type { CheatSheetItem, ContentFrontMatter, NoteItem, SearchItem } from './types';

const SEARCH_CONTENT_PREVIEW_LENGTH = 800;

const noteModules = import.meta.glob('/content/notes/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const cheatsheetModules = import.meta.glob('/content/cheatsheets/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

const formatTags = (value: string | string[] | undefined): string[] => {
  if (Array.isArray(value)) {
    return value.map((tag) => tag.trim().replace(/^\[|\]$/g, '')).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  return [];
};

const parseFrontMatter = (markdown: string) => {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return { frontMatter: {} as Record<string, string | string[]>, body: markdown };
  }

  const frontMatter: Record<string, string | string[]> = {};

  for (const line of match[1].split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.includes(':')) continue;

    const [key, ...valueParts] = trimmed.split(':');
    const rawValue = valueParts.join(':').trim();

    if (key === 'tags') {
      frontMatter[key] = formatTags(rawValue);
      continue;
    }

    frontMatter[key] = rawValue.replace(/^['"]|['"]$/g, '');
  }

  return {
    frontMatter,
    body: markdown.slice(match[0].length),
  };
};

const normalizeContent = (sourcePath: string, markdown: string): { frontMatter: ContentFrontMatter; content: string; slug: string } => {
  const { frontMatter, body } = parseFrontMatter(markdown);
  const title = String(frontMatter.title ?? sourcePath.split('/').pop()?.replace(/\.md$/, '') ?? 'Untitled');
  const topic = String(frontMatter.topic ?? 'General');
  const tags = formatTags(frontMatter.tags);
  const date = String(frontMatter.date ?? '');
  const slug = sourcePath.split('/').pop()!.replace(/\.md$/, '');

  return {
    frontMatter: { title, topic, tags, date },
    content: body.trim(),
    slug,
  };
};

export const loadNotes = (): NoteItem[] => {
  return Object.entries(noteModules)
    .map(([sourcePath, markdown]) => {
      const normalized = normalizeContent(sourcePath, String(markdown));
      return {
        ...normalized.frontMatter,
        slug: normalized.slug,
        content: normalized.content,
        sourcePath,
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
};

export const loadCheatSheets = (): CheatSheetItem[] => {
  return Object.entries(cheatsheetModules)
    .map(([sourcePath, markdown]) => {
      const normalized = normalizeContent(sourcePath, String(markdown));
      return {
        ...normalized.frontMatter,
        slug: normalized.slug,
        content: normalized.content,
        sourcePath,
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
};

export const buildSearchIndex = (notes: NoteItem[], cheatSheets: CheatSheetItem[]) => {
  const docs: SearchItem[] = [
    ...notes.map((note) => ({
      id: `note-${note.slug}`,
      title: note.title,
      topic: note.topic,
      tags: note.tags,
      type: 'note' as const,
      content: note.content.slice(0, SEARCH_CONTENT_PREVIEW_LENGTH),
      date: note.date,
      slug: note.slug,
    })),
    ...cheatSheets.map((sheet) => ({
      id: `cheatsheet-${sheet.slug}`,
      title: sheet.title,
      topic: sheet.topic,
      tags: sheet.tags,
      type: 'cheatsheet' as const,
      content: sheet.content.slice(0, SEARCH_CONTENT_PREVIEW_LENGTH),
      date: sheet.date,
      slug: sheet.slug,
    })),
  ];

  const index = new MiniSearch({
    fields: ['title', 'topic', 'tags', 'content'],
    storeFields: ['id', 'title', 'topic', 'tags', 'type', 'content', 'date', 'slug'],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      combineWith: 'AND',
    },
  });

  index.addAll(docs);

  return { index, docs };
};

export const getTopicOptions = (items: Array<{ topic: string }>) => {
  return Array.from(new Set(items.map((item) => item.topic))).sort((a, b) => a.localeCompare(b));
};
