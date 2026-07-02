import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';

/**
 * ESERCIZIO A1.3 — Form base (Reactive Forms)
 * Obiettivo: validare un piccolo form di iscrizione.
 *
 * Requisiti:
 *  1. Il campo "Nome" è obbligatorio.
 *  2. Il campo "Email" è obbligatorio e deve essere una email valida.
 *  3. Mostra un messaggio di errore sotto ogni campo non valido (dopo il touch).
 *  4. Il pulsante "Invia" è disabilitato finché il form non è valido.
 *  5. All'invio valido, mostra il riepilogo (popola il signal `submitted`).
 */
@Component({
  selector: 'app-a1-3-form',
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A1.3 — Form base</h2>

    <form class="card" [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        Nome
        <input type="text" formControlName="name" />
      </label>
      <!-- TODO: messaggio d'errore -->

      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      <!-- TODO: messaggio d'errore -->

      <!-- TODO -->
      <button type="submit">Invia</button>
    </form>

    @if (submitted()) {
      <p class="hint">Inviato: {{ submitted() | json }}</p>
    }
  `,
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        max-width: 360px;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-weight: 600;
      }
    `,
  ],
})
export class FormExercise {
  private fb = new FormBuilder();

  form = this.fb.group({
    name: [''], // TODO
    email: [''], // TODO
  });

  submitted = signal<{ name: string; email: string } | null>(null);

  onSubmit(): void {
    // TODO
  }
}
