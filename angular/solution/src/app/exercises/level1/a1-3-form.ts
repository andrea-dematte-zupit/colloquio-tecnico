import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

/**
 * ESERCIZIO A1.3 — Form base (Reactive Forms) — SOLUZIONE
 *
 * Versione "base" di Reactive Forms (A3.2 è la versione avanzata con validator
 * custom/async). L'idioma corretto qui è la Reactive Forms API; i `signal`
 * restano lo standard per lo stato locale (qui `submitted`).
 *
 * Requisiti: Nome obbligatorio; Email obbligatoria e valida; messaggi d'errore
 * dopo il touch; submit disabilitato se il form non è valido; all'invio valido
 * mostra il riepilogo.
 * 
 * Domande:
 * 
 * Quando diventa 'touched' un formcontrol?
 * Differenze tra ReactiveForms e TemplateDrivenForms?
 * ...
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
      @if (form.controls.name.invalid && form.controls.name.touched) {
        <span class="error">Il nome è obbligatorio.</span>
      }

      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      @if (form.controls.email.invalid && form.controls.email.touched) {
        <span class="error">Inserisci un'email valida.</span>
      }

      <button type="submit" [disabled]="form.invalid">Invia</button>
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
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  submitted = signal<{ name: string; email: string } | null>(null);

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitted.set(this.form.getRawValue() as { name: string; email: string });
  }
}
