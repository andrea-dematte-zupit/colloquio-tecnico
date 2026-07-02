import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

/**
 * ESERCIZIO A1.2 — Lista filtrabile — SOLUZIONE
 *
 * STANDARD MODERNO (preferito): stato in un `signal` (query) e risultato in un
 * `computed` derivato — si ricalcola da solo al cambio di query, niente metodo
 * richiamato a ogni change detection.
 *
 * NB: il candidato NON è obbligato ad usare Signals. È valido anche tenere `query` come campo e
 * filtrare in un metodo `filtered()` anche se usare signal + computed è ormai lo standard.
 * 
 * Domande:
 * 
 * Come funziona 'computed'?
 * ...
 */
@Component({
  selector: 'app-a1-2-filter-list',
  imports: [FormsModule, RouterLink],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A1.2 — Lista filtrabile</h2>

    <div class="card">
      <input
        type="text"
        placeholder="Cerca una città..."
        [ngModel]="query()"
        (ngModelChange)="query.set($event)"
      />

      <ul>
        @for (city of filtered(); track city) {
          <li>{{ city }}</li>
        } @empty {
          <li class="hint">Nessuna città trovata.</li>
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

  filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    return q ? this.cities.filter((c) => c.toLowerCase().includes(q)) : this.cities;
  });
}
