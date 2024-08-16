import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest/guest.guard.js';
import { NotFoundComponent } from './pages/not-found/not-found.component.js';
import { HomeComponent } from './pages/home/home.component.js';
import { ProfileComponent } from './pages/profile/profile.component.js';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    component: ProfileComponent,
  },
  { path: '**', component: NotFoundComponent },
];
