import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Componente figlio riusabile: mostra 5 stelle e notifica il voto scelto (A2.3) — SOLUZIONE.
 *
 * STANDARD MODERNO (preferito): `input()` / `output()` basati su signal al posto
 * dei decoratori `@Input()` / `@Output()`. Il candidato può usare anche i
 * decoratori classici, ma input()/output() sono l'idioma raccomandato.
 *
 * Requisiti: 5 stelle piene (★) fino a value(), vuote (☆) le altre; al click
 * sulla stella i-esima emette il valore i.
 */
@Component({
  selector: 'app-star-rating',
  template: `
    <div class="stars">
      @for (star of [1, 2, 3, 4, 5]; track star) {
        <span class="star" (click)="valueChange.emit(star)">{{ star <= value() ? '★' : '☆' }}</span>
      }
    </div>
  `,
  styles: [
    `
      .stars {
        font-size: 1.8rem;
        cursor: pointer;
        user-select: none;
        color: #f5a623;
      }
    `,
  ],
})
export class StarRating {
  value = input(0);
  valueChange = output<number>();
}

/**
 * ESERCIZIO A2.3 — Star rating (@Input / @Output)
 * Il componente padre usa <app-star-rating> e mostra il voto selezionato.
 */
@Component({
  selector: 'app-a2-3-star-rating',
  imports: [RouterLink, StarRating],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A2.3 — Star rating</h2>

    <div class="card">
      <app-star-rating [value]="rating()" (valueChange)="rating.set($event)" />
      <p class="hint">Voto selezionato: {{ rating() }}/5</p>
    </div>
  `,
})
export class StarRatingExercise {
  rating = signal(0);
}
