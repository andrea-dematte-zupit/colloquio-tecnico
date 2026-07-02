import { Injectable, signal } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

/**
 * Service che mantiene lo stato della todo list (esercizio A2.2) — SOLUZIONE.
 *
 * STANDARD MODERNO (preferito): lo stato vive in un `signal` aggiornato in modo
 * immutabile con update(); il componente lo legge come `todos()`. Un eventuale
 * dato derivato (es. conteggio dei completati) andrebbe in un `computed`.
 * Va bene anche un BehaviorSubject/array classico, ma i signal sono l'idioma raccomandato.
 */
@Injectable({ providedIn: 'root' })
export class TodoService {
  private nextId = 1;

  // Stato esposto in sola lettura tramite il signal `todos`.
  readonly todos = signal<Todo[]>([]);

  add(title: string): void {
    const trimmed = title.trim();
    if (!trimmed) return;
    this.todos.update((list) => [...list, { id: this.nextId++, title: trimmed, done: false }]);
  }

  toggle(id: number): void {
    this.todos.update((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  remove(id: number): void {
    this.todos.update((list) => list.filter((t) => t.id !== id));
  }
}
