import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { projects } from './data/portfolio.data';

// Pages serves static files; keep Node rendering available in the normal build.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  {
    path: 'projects/:slug', renderMode: RenderMode.Prerender, fallback: PrerenderFallback.Client,
    getPrerenderParams: async () => projects.map((project) => ({ slug: project.slug })),
  },
  { path: '**', renderMode: RenderMode.Client },
];
