import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest/guest.guard.js';
import { authGuard } from './core/guards/auth/auth.guard.js';

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
  {
    path: 'orders',
    pathMatch: 'full',
    canMatch: [authGuard],
    loadComponent: () =>
      import(
        './orders/components/order-page/order-page.component.js'
      ).then(M => M.OrderPageComponent),
  },
];
