import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-profile',
  template: `
    <div class="card">
      <h3>Area riservata</h3>
      <p>Token attivo: <code>{{ auth.token() }}</code></p>
      <button (click)="callApi()">Chiama API protetta</button>
      @if (called()) {
        <p class="hint">
          Richiesta inviata. Controlla la tab <b>Network</b>: deve avere l'header
          <code>Authorization</code> aggiunto dall'interceptor.
        </p>
      }
    </div>
  `,
})
export class ProfileComponent {
  protected auth = inject(AuthService);
  private http = inject(HttpClient);
  called = signal(false);

  callApi(): void {
    // L'interceptor (esercizio) deve aggiungere l'header Authorization a questa richiesta.
    this.http.get('/data/users.json').subscribe();
    this.called.set(true);
  }
}
