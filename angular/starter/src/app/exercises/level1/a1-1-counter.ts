import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * ESERCIZIO A1.1 — Counter
 * Obiettivo: implementare un contatore con i pulsanti + / − / Reset.
 *
 * Requisiti:
 *  1. "+"      incrementa di 1.
 *  2. "−"      decrementa di 1, MA il contatore non deve mai andare sotto 0.
 *  3. "Reset"  riporta il valore a 0.
 *  4. Il pulsante "−" deve essere disabilitato quando il valore è 0.
 */
@Component({
  selector: 'app-a1-1-counter',
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A1.1 — Counter</h2>

    <div class="card counter">
      <button class="ghost" (click)="decrement()">−</button>
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
    // TODO
  }

  decrement(): void {
    // TODO
  }

  reset(): void {
    // TODO
  }
}
