import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * ESERCIZIO A3.3 (parte 2/2) — Route guard
 * Obiettivo: proteggere l'area riservata.
 *
 * Requisiti:
 *  1. Se l'utente è autenticato (AuthService.isAuthenticated), consenti l'accesso (true).
 *  2. Altrimenti reindirizza a '../login' e nega l'accesso.
 *
 * Suggerimento: inietta Router e ritorna `router.createUrlTree([...])` per redirigere.
 * Le route sono: 'a3-3-auth/login' e 'a3-3-auth/profile'.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/a3-3-auth/login']);
};
