import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest/guest.guard.js';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import(
        './auth/components/login/login.component.js'
      ).then(M => M.LoginComponent),
    pathMatch: 'full',
    canMatch: [guestGuard],
  },
];
