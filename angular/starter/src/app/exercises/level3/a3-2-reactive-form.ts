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
 * ESERCIZIO A3.2 — Reactive form avanzato
 * Obiettivo: validazioni custom su un form di registrazione.
 *
 * Requisiti:
 *  1. `username`: obbligatorio + validator ASINCRONO che lo rifiuta se già preso
 *  2. `password` e `confirm`: obbligatori; devono coincidere
 *  3. Il template mostra già gli errori e disabilita il submit se il form non è valido.
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

  /** Username già registrati (simula il backend). */
  private readonly taken = ['admin', 'root', 'zupit'];

  form = this.fb.group(
    {
      username: ['', { validators: [Validators.required], asyncValidators: [this.usernameAvailable()] }],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
    },
    { validators: [this.passwordMatch] },
  );

  passwordMatch(group: AbstractControl): ValidationErrors | null {
    // TODO
    return null;
  }

  usernameAvailable(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // TODO
      return of(null);
    };
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.done = true;
    }
  }
}
