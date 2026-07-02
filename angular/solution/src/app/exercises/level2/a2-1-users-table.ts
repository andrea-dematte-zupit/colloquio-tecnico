import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  city: string;
}

/**
 * ESERCIZIO A2.1 — Tabella da API — SOLUZIONE
 *
 * STANDARD MODERNO (preferito): usa `rxResource` per gestire il caricamento.
 * Espone automaticamente i signal `value()` / `isLoading()` / `error()`,
 * eliminando la gestione manuale degli stati e delle subscription.
 *
 * NB: il candidato NON è obbligato a usarlo. È pienamente valido anche
 * l'approccio classico (`http.get(...).subscribe({ next, error })` con tre
 * signal manuali loading/error/users). Se però usa resource/rxResource, meglio.
 */
@Component({
  selector: 'app-a2-1-users-table',
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A2.1 — Tabella da API</h2>

    <div class="card">
      @if (usersResource.isLoading()) {
        <p class="hint">Caricamento…</p>
      } @else if (usersResource.error()) {
        <p class="error">Impossibile caricare gli utenti.</p>
      } @else {
        <table>
          <thead>
            <tr><th>#</th><th>Nome</th><th>Email</th><th>Città</th></tr>
          </thead>
          <tbody>
            @for (u of usersResource.value(); track u.id) {
              <tr>
                <td>{{ u.id }}</td>
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.city }}</td>
              </tr>
            } @empty {
              <tr><td colspan="4" class="hint">Nessun dato.</td></tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
})
export class UsersTableExercise {
  private http = inject(HttpClient);

  // rxResource: carica all'avvio ed espone value/isLoading/error come signal.
  usersResource = rxResource({
    stream: () => this.http.get<User[]>('/data/users.json'),
    defaultValue: [] as User[],
  });
}
