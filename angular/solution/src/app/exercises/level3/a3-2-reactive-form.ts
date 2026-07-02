import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable, of, delay, map } from 'rxjs';

/**
 * ESERCIZIO A3.2 — Reactive form avanzato — SOLUZIONE
 *
 * Qui l'idioma corretto è la Reactive Forms API (validator sincroni/async):
 * non è un caso adatto a resource/rxResource. I `signal` restano lo standard
 * per lo stato locale dove serve.
 *
 * Requisiti: `username` obbligatorio + validator asincrono che dà { taken: true }
 * se già preso; `password`/`confirm` obbligatori e coincidenti (validator di
 * gruppo con { mismatch: true }); il template mostra gli errori e disabilita il submit.
 */
@Component({
  selector: 'app-a3-2-reactive-form',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A3.2 — Reactive form avanzato</h2>

    <form class="card" [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        Username
        <input type="text" formControlName="username" />
      </label>
      @if (form.controls.username.pending) {
        <span class="hint">Verifica disponibilità…</span>
      }
      @if (form.controls.username.hasError('taken')) {
        <span class="error">Username già in uso.</span>
      }

      <label>
        Password
        <input type="password" formControlName="password" />
      </label>

      <label>
        Conferma password
        <input type="password" formControlName="confirm" />
      </label>
      @if (form.hasError('mismatch') && form.controls.confirm.touched) {
        <span class="error">Le password non coincidono.</span>
      }

      <button type="submit" [disabled]="form.invalid">Registrati</button>
      @if (done) {
        <p class="hint">Registrazione completata ✔</p>
      }
    </form>
  `,
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
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
export class ReactiveFormExercise {
  private fb = new FormBuilder();
  done = false;

  private readonly taken = ['admin', 'root', 'zupit'];

  form = this.fb.group(
    {
      username: ['', { validators: [Validators.required], asyncValidators: [this.usernameAvailable()] }],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
    },
    { validators: [this.passwordMatch] },
  );

  /** Validator cross-field: deve restituire { mismatch: true } se password !== confirm. */
  passwordMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  /** Async validator: { taken: true } se lo username è nella lista `taken` (con 500ms di ritardo). */
  usernameAvailable(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = (control.value ?? '').toLowerCase();
      return of(this.taken.includes(value)).pipe(
        delay(500),
        map((isTaken) => (isTaken ? { taken: true } : null)),
      );
    };
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.done = true;
    }
  }
}
