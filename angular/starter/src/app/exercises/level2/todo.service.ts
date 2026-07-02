import { Injectable, signal } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

/**
 * Service che mantiene lo stato della todo list (parte dell'esercizio A2.2).
 * Implementa i tre metodi seguendo i requisiti descritti nel componente.
 */
@Injectable({ providedIn: 'root' })
export class TodoService {
  private nextId = 1;

  // Stato esposto in sola lettura tramite il signal `todos`.
  readonly todos = signal<Todo[]>([]);

  add(title: string): void {
    // TODO: aggiungi la todo (ignora i titoli vuoti)
  }

  toggle(id: number): void {
    // TODO: alterna lo stato completato
  }

  remove(id: number): void {
    // TODO: rimuovi la todo
  }
}
