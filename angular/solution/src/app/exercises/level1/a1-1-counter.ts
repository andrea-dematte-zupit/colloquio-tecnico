import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * ESERCIZIO A1.1 — Counter — SOLUZIONE
 *
 * STANDARD MODERNO (preferito): stato in un `signal`, aggiornato con
 * set()/update(); nessun campo mutabile "classico". Il candidato non è
 * obbligato (va bene anche una proprietà numerica normale), ma i signal sono
 * l'idioma raccomandato.
 *
 * Requisiti: +/− aggiornano il valore (mai sotto 0), Reset azzera, "−"
 * disabilitato quando il valore è 0.
 */
@Component({
  selector: 'app-a1-1-counter',
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A1.1 — Counter</h2>

    <div class="card counter">
      <button class="ghost" [disabled]="count() === 0" (click)="decrement()">−</button>
      <span class="value">{{ count() }}</span>
      <button class="ghost" (click)="increment()">+</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
  styles: [
    `
      .counter {
        display: flex;
        align-items: center;
        gap: 1rem;
        width: fit-content;
      }
      .value {
        font-size: 1.6rem;
        font-weight: 700;
        min-width: 2.5rem;
        text-align: center;
      }
    `,
  ],
})
export class CounterExercise {
  count = signal(0);

  increment(): void {
    this.count.update((n) => n + 1);
  }

  decrement(): void {
    this.count.update((n) => Math.max(0, n - 1));
  }

  reset(): void {
    this.count.set(0);
  }
}
