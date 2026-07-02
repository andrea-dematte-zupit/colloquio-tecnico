import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthExercise } from './a3-3-auth';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { authInterceptor } from './auth.interceptor';
import { authGuard } from './auth.guard';

/**
 * Route della feature Auth. L'interceptor è registrato SOLO qui (a livello di
 * feature) così l'esercizio non interferisce con il resto dell'app.
 */
export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthExercise,
    providers: [provideHttpClient(withInterceptors([authInterceptor]))],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },
];
