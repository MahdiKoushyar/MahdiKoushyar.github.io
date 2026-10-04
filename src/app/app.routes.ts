import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((module) => module.HomeComponent),
    title: 'Mahdi Koushyar — Software Engineer & Frontend Architect',
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./pages/project-case-study/project-case-study.component').then((module) => module.ProjectCaseStudyComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((module) => module.NotFoundComponent),
    title: 'Page not found — Mahdi Koushyar',
  },
];
