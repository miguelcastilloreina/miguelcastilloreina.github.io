import { parse } from 'yaml';
import profileRaw from '../data/profile.yaml?raw';
import pubsRaw from '../data/publications.yaml?raw';
import projectsRaw from '../data/projects.yaml?raw';
import activityRaw from '../data/activity.yaml?raw';
import aboutRaw from '../data/about.yaml?raw';

export type Lang = 'en' | 'es';
/** A text that is either the same in both languages or has an en/es version. */
export type Text = string | { en?: string; es?: string };

export interface Publication {
  type: 'article' | 'working' | 'chapter' | 'book' | 'policy';
  year: number;
  title: string;
  authors: string[];
  outlet?: string;
  venue: Text;
  doi?: string;
  url?: string;
  url_label?: Text;
  status?: Text;
  image?: string;
  selected?: boolean;
  line?: string;
}

export const profile = parse(profileRaw);
export const projects = parse(projectsRaw);
export const activity = parse(activityRaw);
export const about = parse(aboutRaw);
/** Activity page and menu item only exist once there is at least one event. */
export const hasActivity = (activity?.events ?? []).length > 0;
export const publications: Publication[] = (parse(pubsRaw) ?? []).sort(
  (a: Publication, b: Publication) => b.year - a.year,
);

/** Picks the right language from a Text (falls back to English, then Spanish). */
export function tr<T = string>(v: any, lang: Lang): T {
  if (v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'es' in v)) {
    return (v[lang] ?? v.en ?? v.es) as T;
  }
  return v as T;
}

const OWN = 'Castillo-Reina';

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Escapes text and applies *italics*, **highlight** and [links](https://…). */
export function inline(s: string) {
  return escape(s ?? '')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.+?)\*/g, '<i>$1</i>');
}

export function authorsHtml(authors: string[]) {
  return authors.map((a) => (a.includes(OWN) ? `<b>${escape(a)}</b>` : escape(a))).join(', ');
}

export function url(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : '/' + path}`;
}

/** Stable anchor for a publication, e.g. "2023-yellow-pitahaya-selenicereus". */
export function pubId(p: Publication) {
  const words = p.title
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean).slice(0, 4);
  return `${p.year}-${words.join('-')}`;
}
