import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-login',
  imports: [FormsModule],
  template: `
    <div class="card">
      <h3>Login</h3>
      <input [(ngModel)]="username" placeholder="Username" />
      <button [disabled]="!username" (click)="login()">Accedi</button>
    </div>
  `,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  username = '';

  login(): void {
    this.auth.login(this.username);
    this.router.navigate(['/a3-3-auth/profile']);
  }
}
