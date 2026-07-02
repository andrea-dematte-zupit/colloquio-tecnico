import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

/**
 * ESERCIZIO A1.2 — Lista filtrabile
 * Obiettivo: filtrare la lista `cities` in base al testo digitato.
 *
 * Requisiti:
 *  1. Collega l'input al campo di ricerca.
 *  2. Mostra solo le città che contengono il testo digitato (case-insensitive).
 *  3. Con input vuoto, mostra tutte le città.
 *  4. (Bonus) Mostra un messaggio quando nessuna città corrisponde.
 */
@Component({
  selector: 'app-a1-2-filter-list',
  imports: [FormsModule, RouterLink],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A1.2 — Lista filtrabile</h2>

    <div class="card">
      <!-- TODO -->
      <input type="text" placeholder="Cerca una città..." />

      <ul>
        <!-- TODO -->
        @for (city of cities; track city) {
          <li>{{ city }}</li>
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
        padding: 0.4rem 0;
        border-bottom: 1px solid #eef1f6;
      }
    `,
  ],
})
export class FilterListExercise {
  query = signal('');

  readonly cities = ['Trento', 'Verona', 'Padova', 'Milano', 'Bologna', 'Roma', 'Torino', 'Venezia'];

  filtered(): string[] {
    // TODO
    return this.cities;
  }
}
