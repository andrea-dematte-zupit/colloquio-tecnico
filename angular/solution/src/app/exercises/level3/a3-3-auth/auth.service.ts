import { Injectable, signal, computed } from '@angular/core';

/**
 * Service di autenticazione minimale (fornito).
 * Tiene un token in memoria; non c'è un backend reale.
 *
 * STANDARD MODERNO: lo stato (token) è un `signal` e `isAuthenticated` è un
 * `computed` derivato — l'idioma raccomandato per lo stato reattivo.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _token = signal<string | null>(null);

  readonly token = this._token.asReadonly();
  readonly isAuthenticated = computed(() => this._token() !== null);

  login(username: string): void {
    // Token finto: in un caso reale arriverebbe dal backend.
    this._token.set(`fake-jwt-for-${username}`);
  }

  logout(): void {
    this._token.set(null);
  }
}
