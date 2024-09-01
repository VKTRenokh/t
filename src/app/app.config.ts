import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';

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
import { stationsReducer } from './state/reducers/stations.reducer';
import { UserEffects } from './state/effects/user.effect';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './state/reducers/user.reducer';
import { carriagesReducer } from './state/reducers/carriages.reducer';
import { CarriagesEffects } from './state/effects/carriages.effect';
import { RoutesEffects } from './state/effects/routes.effect';
import { routesReducer } from './state/reducers/routes.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      auth: authReducer,
      user: userReducer,
      stations: stationsReducer,
      carriages: carriagesReducer,
      routes: routesReducer,
    }),
    provideEffects(
      AuthEffects,
      UserEffects,
      StationsEffects,
      CarriagesEffects,
      RoutesEffects,
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
