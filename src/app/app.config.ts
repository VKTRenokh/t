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
import { StationsEffects } from './state/effects/stations.effect';
import { ProfileEffects } from './state/effects/profile.effect';
import { profileReducer } from './state/reducers/profile.reducer';
import { stationsReducer } from './state/reducers/stations.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      auth: authReducer,
      profile: profileReducer,
      stations: stationsReducer,
    }),
    provideEffects(
      AuthEffects,
      ProfileEffects,
      StationsEffects,
    ),
  ],
};
