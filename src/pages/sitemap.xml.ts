// Mapa del sitio para buscadores: cada página en inglés y en español, enlazadas entre sí.
import type { APIRoute } from 'astro';
import { routes } from '../lib/i18n';
import { hasActivity } from '../lib/data';

export const GET: APIRoute = ({ site }) => {
  const base = (site?.toString() ?? '').replace(/\/$/, '');
  const abs = (p: string) => base + (p.endsWith('/') ? p : p + '/');
  const keys = (Object.keys(routes) as (keyof typeof routes)[]).filter((k) => k !== 'activity' || hasActivity);
  const today = new Date().toISOString().slice(0, 10);

  const entries = keys.flatMap((k) =>
    (['en', 'es'] as const).map((lang) => `  <url>
    <loc>${abs(routes[k][lang])}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(routes[k].en)}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${abs(routes[k].es)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(routes[k].en)}"/>
  </url>`),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
