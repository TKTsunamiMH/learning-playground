import MiniSearch from 'minisearch';
import type { CheatSheetItem, ContentFrontMatter, NoteItem, SearchItem, TopicMetadata, TopicSummary } from './types';

const SEARCH_CONTENT_PREVIEW_LENGTH = 800;

const noteModules = import.meta.glob('/content/notes/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const cheatsheetModules = import.meta.glob('/content/cheatsheets/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const topicMetadataModule = import.meta.glob('/content/topics.json', { eager: true, import: 'default' }) as Record<string, unknown>;

const TITLE_ACRONYMS = new Set(['api', 'css', 'csharp', 'dotnet', 'git', 'html', 'http', 'js', 'json', 'rest', 'seo', 'sql', 'ts', 'ui', 'ux']);

const createReadableTitle = (value: string): string => {
  return value
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word) => {
      const normalized = word.toLowerCase();

      if (normalized === 'c#') {
        return 'C#';
      }

      if (normalized === '.net' || normalized === 'net') {
        return '.NET';
      }

      if (TITLE_ACRONYMS.has(normalized)) {
        return normalized.toUpperCase();
      }

      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    })
    .join(' ');
};

const createTopicSlug = (topic: string): string => {
  return topic
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};

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
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return { frontMatter: {} as Record<string, string | string[]>, body: markdown };
  }

  const frontMatter: Record<string, string | string[]> = {};

  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.includes(':')) continue;

    const [rawKey, ...valueParts] = trimmed.split(':');
    const key = rawKey.trim();
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
  const slug = sourcePath.split('/').pop()!.replace(/\.md$/, '');
  const title = String(frontMatter.title ?? createReadableTitle(slug));
  const topic = String(frontMatter.topic ?? 'General');
  const tags = formatTags(frontMatter.tags);
  const date = String(frontMatter.date ?? '');

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

export const getTagOptions = (items: Array<{ tags: string[] }>) => {
  return Array.from(new Set(items.flatMap((item) => item.tags))).sort((a, b) => a.localeCompare(b));
};

export const getNotePath = (note: Pick<NoteItem, 'slug' | 'topic'>) => {
  return `/notes/${createTopicSlug(note.topic)}/${note.slug}`;
};

const readTopicMetadata = (): TopicMetadata[] => {
  const source = Object.values(topicMetadataModule)[0];

  if (!source) {
    return [];
  }

  if (Array.isArray(source)) {
    return source.filter((item): item is TopicMetadata => typeof item === 'object' && item !== null && 'name' in item);
  }

  return [];
};

const topicMetadataByName = new Map(readTopicMetadata().map((item) => [item.name, item]));

export const getTopicSummaries = (notes: NoteItem[]): TopicSummary[] => {
  const grouped = new Map<string, number>();

  for (const note of notes) {
    grouped.set(note.topic, (grouped.get(note.topic) ?? 0) + 1);
  }

  return Array.from(grouped.entries())
    .map(([name, count]) => {
      const metadata = topicMetadataByName.get(name);
      return {
        name,
        slug: createTopicSlug(name),
        count,
        description: metadata?.description,
        icon: metadata?.icon,
        sortOrder: metadata?.sortOrder ?? Number.MAX_SAFE_INTEGER,
      };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
};

export const getTopicNameFromSlug = (notes: NoteItem[], topicSlug: string): string | undefined => {
  const summaries = getTopicSummaries(notes);
  return summaries.find((summary) => summary.slug === topicSlug)?.name;
};
