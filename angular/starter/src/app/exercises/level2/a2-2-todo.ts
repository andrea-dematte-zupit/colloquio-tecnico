import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoService } from './todo.service';

/**
 * ESERCIZIO A2.2 — Todo list
 * Obiettivo: gestire una todo list il cui stato vive in un Service.
 *
 * Requisiti:
 *  1. Implementa i metodi add / toggle / remove in `todo.service.ts`.
 *  2. "Aggiungi" inserisce una nuova todo col testo dell'input e lo svuota.
 *  3. Cliccando una todo si alterna lo stato completato (testo barrato).
 *  4. "✕" rimuove la todo.
 *
 * Il componente è già cablato sul service: concentra il lavoro sul service.
 */
@Component({
  selector: 'app-a2-2-todo',
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A2.2 — Todo list</h2>

    <div class="card">
      <div class="add-row">
        <input
          #box
          type="text"
          placeholder="Nuova attività…"
          (keyup.enter)="add(box.value); box.value = ''"
        />
        <button (click)="add(box.value); box.value = ''">Aggiungi</button>
      </div>

      <ul>
        @for (t of service.todos(); track t.id) {
          <li>
            <span [class.done]="t.done" (click)="service.toggle(t.id)">{{ t.title }}</span>
            <button class="ghost" (click)="service.remove(t.id)">✕</button>
          </li>
        } @empty {
          <li class="hint">Nessuna attività.</li>
        }
      </ul>
    </div>
  `,
  styles: [
    `
      .add-row {
        display: flex;
        gap: 0.5rem;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0;
      }
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem 0;
        border-bottom: 1px solid #eef1f6;
      }
      li span {
        cursor: pointer;
      }
      .done {
        text-decoration: line-through;
        color: #9aa1ad;
      }
    `,
  ],
})
export class TodoExercise {
  protected service = inject(TodoService);

  add(title: string): void {
    this.service.add(title);
  }
}
