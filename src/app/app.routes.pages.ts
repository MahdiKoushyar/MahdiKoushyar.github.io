import { RenderMode, ServerRoute } from '@angular/ssr';

// Pages serves static files; keep Node rendering available in the normal build.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
