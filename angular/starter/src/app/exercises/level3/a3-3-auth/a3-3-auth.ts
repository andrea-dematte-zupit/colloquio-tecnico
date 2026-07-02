import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * ESERCIZIO A3.3 — Auth flow (interceptor + guard)
 *
 * Questo è il layout della feature. Il lavoro è in:
 *  - auth.interceptor.ts  (aggiungere l'header Authorization)
 *  - auth.guard.ts        (proteggere /profile e redirigere al login)
 *
 * Flusso atteso: senza login, "Area riservata" reindirizza a Login.
 * Dopo il login si accede al profilo e le richieste partono con il token.
 */
@Component({
  selector: 'app-a3-3-auth',
  imports: [RouterLink, RouterOutlet],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A3.3 — Auth flow</h2>

    <nav class="tabs">
      <a routerLink="login">Login</a>
      <a routerLink="profile">Area riservata</a>
      @if (auth.isAuthenticated()) {
        <button class="ghost" (click)="logout()">Logout</button>
      }
    </nav>

    <router-outlet />
  `,
  styles: [
    `
      .tabs {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-bottom: 1rem;
      }
      .tabs a {
        text-decoration: none;
        color: #1f2a44;
        font-weight: 600;
      }
    `,
  ],
})
export class AuthExercise {
  protected auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/a3-3-auth/login']);
  }
}
