import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest/guest.guard.js';
import { authGuard } from './core/guards/auth/auth.guard.js';
import { managerGuard } from './core/guards/manager/manager.guard.js';
import { profileResolver } from './core/resolvers/profile/profile.resolver.js';

const adminRoutes: Routes = [
  {
    path: 'stations',
    loadComponent: () =>
      import(
        './stations/components/stations-page/stations-page.component.js'
      ).then(M => M.StationsPageComponent),
  },
  {
    path: 'routes',
    loadComponent: () =>
      import(
        './routes/components/routes-page/routes-page.component.js'
      ).then(M => M.RoutesPageComponent),
    children: [],
  },
  {
    path: 'routes/:id',
    loadComponent: () =>
      import(
        './routes/components/ride-page/ride-page.component.js'
      ).then(M => M.RidePageComponent),
  },
];

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
        './profile/components/profile/profile.component.js'
      ).then(M => M.ProfileComponent),
    pathMatch: 'full',
    canMatch: [authGuard],
  },
  {
    path: 'manager',
    canMatch: [managerGuard],
    resolve: { profile: profileResolver },
    children: adminRoutes,
  },
  {
    path: 'carriages',
    canMatch: [managerGuard],
    loadComponent: () =>
      import(
        './carriages/components/carriages-page/carriages-page.component.js'
      ).then(M => M.CarriagesPageComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './core/components/not-found/not-found.component.js'
      ).then(M => M.NotFoundComponent),
  },
];
