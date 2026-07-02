import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * ESERCIZIO A3.3 (parte 1/2) — HttpInterceptor
 * Obiettivo: aggiungere automaticamente l'header Authorization alle richieste.
 *
 * Requisiti:
 *  1. Leggi il token dall'AuthService.
 *  2. Se il token esiste, aggiungi alla richiesta
 *     l'header 'Authorization: Bearer <token>' e inoltrala.
 *  3. Se il token è assente, inoltra la richiesta invariata.
 *
 * Verifica: dopo il login, nella tab Network del browser le richieste partono
 * con l'header Authorization.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  // TODO
  return next(req);
};
