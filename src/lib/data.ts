import { parse } from 'yaml';
import profileRaw from '../data/profile.yaml?raw';
import pubsRaw from '../data/publications.yaml?raw';
import projectsRaw from '../data/projects.yaml?raw';
import activityRaw from '../data/activity.yaml?raw';

export interface Publication {
  type: 'article' | 'working' | 'chapter' | 'book' | 'policy';
  year: number;
  title: string;
  authors: string[];
  venue: string;
  doi?: string;
  url?: string;
  url_label?: string;
  status?: string;
  selected?: boolean;
  line?: string;
}

export const profile = parse(profileRaw);
export const projects = parse(projectsRaw);
export const activity = parse(activityRaw);
export const publications: Publication[] = (parse(pubsRaw) ?? []).sort(
  (a: Publication, b: Publication) => b.year - a.year,
);

export const pubGroups: { type: Publication['type']; label: string; short: string }[] = [
  { type: 'article', label: 'Journal articles', short: 'Articles' },
  { type: 'working', label: 'Working papers and theses', short: 'Working papers' },
  { type: 'chapter', label: 'Book chapters', short: 'Chapters' },
  { type: 'book', label: 'Books', short: 'Books' },
  { type: 'policy', label: 'Policy documents and reports', short: 'Policy' },
];

const OWN = 'Castillo-Reina';

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Escapes text, turns *x* into italics and **x** into a highlight. */
export function inline(s: string) {
  return escape(s ?? '')
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
