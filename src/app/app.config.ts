import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authReducer } from './state/reducers/auth.reducer';
import { AuthEffects } from './state/effects/auth.effect';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { stationsReducer } from './state/reducers/stations.reducer';
import { StationsEffects } from './state/effects/stations.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      auth: authReducer,
      stations: stationsReducer,
    }),
    provideEffects(AuthEffects, StationsEffects),
  ],
};
