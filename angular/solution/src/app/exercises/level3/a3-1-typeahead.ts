import { Component } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable, of, delay, debounceTime, distinctUntilChanged } from 'rxjs';

/**
 * ESERCIZIO A3.1 — Typeahead — SOLUZIONE
 *
 * STANDARD MODERNO (preferito): debounce/distinct con RxJS, poi `rxResource`
 * con un signal di `params` (il termine "stabilizzato"). rxResource ricarica
 * a ogni cambio di params e ANNULLA automaticamente lo stream precedente
 * (sostituisce lo `switchMap`), esponendo `value()` / `isLoading()`.
 *
 * NB: il candidato NON è obbligato a usarlo. È pienamente valido anche
 * l'approccio classico tutto-RxJS (valueChanges → debounceTime →
 * distinctUntilChanged → switchMap(search) → subscribe in un signal `results`),
 * mostrato in fondo a questo file come riferimento. Se usa resource/rxResource, meglio.
 * 
 * 
 * Domande:
 * 
 * Spiega eventuali operatori RxJs che vai ad usare e perchè l'ordine è importante.
 * 
 * Cosa succede ad un eventuale richiesta HTTP in transito se continuo a scrivere nell'input?
 * 
 * Se usassimo MergeMap al posto di SwitchMap (nel caso lo avesse utilizzato) cosa succederebbe? (Se risponde bene a questa domanda ottimo)
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
        @for (r of results.value(); track r) {
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

  private readonly fruits = ['Mela', 'Melone', 'Banana', 'Arancia', 'Albicocca', 'Ananas', 'Pera', 'Pesca', 'Fragola', 'Mirtillo'];

  // 1) RxJS solo per "stabilizzare" il termine digitato → signal.
  private term = toSignal(
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()),
    { initialValue: '' },
  );

  // 2) rxResource reagisce al signal `term`: ricarica e annulla lo stream precedente.
  results = rxResource({
    params: () => this.term() ?? '',
    stream: ({ params }) => this.search(params),
    defaultValue: [] as string[],
  });

  /** Simula una chiamata API: ritorna i frutti che contengono `term` con 400ms di ritardo. */
  search(term: string): Observable<string[]> {
    const q = term.trim().toLowerCase();
    const matches = q ? this.fruits.filter((f) => f.toLowerCase().includes(q)) : [];
    return of(matches).pipe(delay(400));
  }
}

/*
 * APPROCCIO CLASSICO (alternativa accettata, tutto-RxJS):
 *
 *   results = signal<string[]>([]);
 *   ngOnInit() {
 *     this.searchControl.valueChanges.pipe(
 *       debounceTime(300),
 *       distinctUntilChanged(),
 *       switchMap((t) => this.search(t ?? '')),
 *     ).subscribe((m) => this.results.set(m));
 *   }
 */
