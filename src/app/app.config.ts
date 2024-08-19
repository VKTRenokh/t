import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
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
import { userReducer } from './state/reducers/user.reducer';
import { UserEffects } from './state/effects/user.effect';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      auth: authReducer,
      user: userReducer,
      stations: stationsReducer,
    }),
    provideEffects(
      AuthEffects,
      UserEffects,
      StationsEffects,
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
