import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest/guest.guard.js';
import { authGuard } from './core/guards/auth/auth.guard.js';

export const routes: Routes = [
  {
    redirectTo: 'search',
    pathMatch: 'full',
    path: '',
  },
  {
    path: 'search',
    pathMatch: 'full',
    loadComponent: () =>
      import(
        './search/components/search-page/search-page.component.js'
      ).then(M => M.SearchPageComponent),
  },
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
    path: 'registration',
    loadComponent: () =>
      import(
        './auth/components/registration/registration.component.js'
      ).then(M => M.RegistrationComponent),
    pathMatch: 'full',
    canMatch: [guestGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import(
        './profile/components/profile.component.js'
      ).then(M => M.ProfileComponent),
    pathMatch: 'full',
    canMatch: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './core/components/not-found/not-found.component.js'
      ).then(M => M.NotFoundComponent),
  },
];
