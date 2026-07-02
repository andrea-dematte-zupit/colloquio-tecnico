import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable, of, delay } from 'rxjs';

/**
 * ESERCIZIO A3.1 — Typeahead
 * Obiettivo: ricerca con autocompletamento usando gli operatori RxJS.
 *
 * Requisiti, partendo da `searchControl.valueChanges`:
 *  1. Attendi 300ms di pausa nella digitazione.
 *  2. Evita ricerche duplicate consecutive.
 *  3. Annulla la richiesta precedente quando ne parte una nuova.
 *
 */
@Component({
  selector: 'app-a3-1-typeahead',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A3.1 — Typeahead</h2>

    <div class="card">
      <input [formControl]="searchControl" type="text" placeholder="Cerca un frutto…" />
      <ul>
        @for (r of results(); track r) {
          <li>{{ r }}</li>
        } @empty {
          <li class="hint">Nessun risultato.</li>
        }
      </ul>
    </div>
  `,
  styles: [
    `
      ul {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0;
      }
      li {
        padding: 0.35rem 0;
        border-bottom: 1px solid #eef1f6;
      }
    `,
  ],
})
export class TypeaheadExercise {
  searchControl = new FormControl('');
  results = signal<string[]>([]);

  private readonly fruits = ['Mela', 'Melone', 'Banana', 'Arancia', 'Albicocca', 'Ananas', 'Pera', 'Pesca', 'Fragola', 'Mirtillo'];

  search(term: string): Observable<string[]> {
    const q = term.trim().toLowerCase();
    const matches = q ? this.fruits.filter((f) => f.toLowerCase().includes(q)) : [];
    return of(matches).pipe(delay(400));
  }
}
