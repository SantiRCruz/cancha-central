import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'noticias', loadComponent: () => import('./pages/news/news').then((m) => m.News) },
  {
    path: 'noticias/:id',
    loadComponent: () => import('./pages/detail/detail').then((m) => m.Detail),
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favorites/favorites').then((m) => m.Favorites),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  { path: 'administrar', loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin) },
  { path: '**', redirectTo: '' },
];
