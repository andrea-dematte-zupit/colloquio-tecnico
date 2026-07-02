export interface ExerciseMeta {
  id: string;
  path: string;
  level: 1 | 2 | 3;
  title: string;
  topic: string;
}

/** Indice dei 9 esercizi Angular, usato dalla home e dalle route. */
export const EXERCISES: ExerciseMeta[] = [
  { id: 'A1.1', path: 'a1-1-counter', level: 1, title: 'Counter', topic: 'Binding & signals' },
  { id: 'A1.2', path: 'a1-2-filter-list', level: 1, title: 'Lista filtrabile', topic: 'Binding & rendering' },
  { id: 'A1.3', path: 'a1-3-form', level: 1, title: 'Form base', topic: 'Reactive Forms (base)' },

  { id: 'A2.1', path: 'a2-1-users-table', level: 2, title: 'Tabella da API', topic: 'HttpClient & stati' },
  { id: 'A2.2', path: 'a2-2-todo', level: 2, title: 'Todo list', topic: 'Service & stato' },
  { id: 'A2.3', path: 'a2-3-star-rating', level: 2, title: 'Star rating', topic: '@Input / @Output' },

  { id: 'A3.1', path: 'a3-1-typeahead', level: 3, title: 'Typeahead', topic: 'RxJS debounce/switchMap' },
  { id: 'A3.2', path: 'a3-2-reactive-form', level: 3, title: 'Reactive form avanzato', topic: 'Validator custom & async' },
  { id: 'A3.3', path: 'a3-3-auth', level: 3, title: 'Auth flow', topic: 'Interceptor & guard' },
];
