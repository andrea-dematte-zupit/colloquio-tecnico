import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  city: string;
}

/**
 * ESERCIZIO A2.1 — Tabella da API
 * Obiettivo: caricare gli utenti da un endpoint e mostrarli in tabella,
 * gestendo gli stati di caricamento ed errore.
 *
 * Endpoint (servito da public/): GET '/data/users.json'
 *
 * Requisiti:
 *  1. In `load()` esegui la GET verso l'endpoint.
 *  2. Durante la chiamata `loading` = true; al termine torna false.
 *  3. In caso di successo popola il signal `users`.
 *  4. In caso di errore popola il signal `error` con un messaggio.
 *  5. Il template mostra già loading / error / tabella in base ai signal.
 */
@Component({
  selector: 'app-a2-1-users-table',
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="hint">← Esercizi</a>
    <h2>A2.1 — Tabella da API</h2>

    <div class="card">
      @if (loading()) {
        <p class="hint">Caricamento…</p>
      } @else if (error()) {
        <p class="error">{{ error() }}</p>
      } @else {
        <table>
          <thead>
            <tr><th>#</th><th>Nome</th><th>Email</th><th>Città</th></tr>
          </thead>
          <tbody>
            @for (u of users(); track u.id) {
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
export class UsersTableExercise implements OnInit {
  private http = inject(HttpClient);

  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    // TODO
  }
}
