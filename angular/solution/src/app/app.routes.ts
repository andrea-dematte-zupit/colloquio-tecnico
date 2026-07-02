import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home').then((m) => m.Home) },

  // Livello 1
  { path: 'a1-1-counter', loadComponent: () => import('./exercises/level1/a1-1-counter').then((m) => m.CounterExercise) },
  { path: 'a1-2-filter-list', loadComponent: () => import('./exercises/level1/a1-2-filter-list').then((m) => m.FilterListExercise) },
  { path: 'a1-3-form', loadComponent: () => import('./exercises/level1/a1-3-form').then((m) => m.FormExercise) },

  // Livello 2
  { path: 'a2-1-users-table', loadComponent: () => import('./exercises/level2/a2-1-users-table').then((m) => m.UsersTableExercise) },
  { path: 'a2-2-todo', loadComponent: () => import('./exercises/level2/a2-2-todo').then((m) => m.TodoExercise) },
  { path: 'a2-3-star-rating', loadComponent: () => import('./exercises/level2/a2-3-star-rating').then((m) => m.StarRatingExercise) },

  // Livello 3
  { path: 'a3-1-typeahead', loadComponent: () => import('./exercises/level3/a3-1-typeahead').then((m) => m.TypeaheadExercise) },
  { path: 'a3-2-reactive-form', loadComponent: () => import('./exercises/level3/a3-2-reactive-form').then((m) => m.ReactiveFormExercise) },
  { path: 'a3-3-auth', loadChildren: () => import('./exercises/level3/a3-3-auth/a3-3-auth.routes').then((m) => m.AUTH_ROUTES) },

  { path: '**', redirectTo: '' },
];
