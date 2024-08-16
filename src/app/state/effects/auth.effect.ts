import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { AuthService } from '../../auth/services/auth/auth.service';
import { AuthActions } from '../actions/auth.action';
import {
  catchError,
  EMPTY,
  exhaustMap,
  map,
  of,
  tap,
} from 'rxjs';
import { StorageService } from '../../core/services/storage/storage.service';
import { tokenKey } from '../../shared/constants/token-key.constant';

@Injectable()
export class AuthEffects {
  private actions = inject(Actions);
  private authService = inject(AuthService);
  private storageService = inject(StorageService);

  private getToken() {
    return this.storageService.get(tokenKey);
  }

  private saveToken(token: string) {
    this.storageService.set(tokenKey, token);
  }

  public loginEffect = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.login),
      exhaustMap(data =>
        this.authService
          .login(data.email, data.password)
          .pipe(
            tap(response => this.saveToken(response.token)),
            map(response =>
              AuthActions.loginSuccess(response),
            ),
            catchError(response =>
              of(
                AuthActions.failure({
                  error: response.error,
                }),
              ),
            ),
          ),
      ),
    ),
  );

  public ragistrationEffect = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.registration),
      exhaustMap(data =>
        this.authService
          .signup(data.email, data.password)
          .pipe(
            map(() => AuthActions.registrationSuccess()),
            catchError(response =>
              of(
                AuthActions.failure({
                  error: response.error,
                }),
              ),
            ),
          ),
      ),
    ),
  );

  public initEffect = createEffect(() =>
    this.actions.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(() => {
        const token = this.getToken();
        if (!token) {
          return EMPTY;
        }
        return of(AuthActions.loginSuccess({ token }));
      }),
    ),
  );
}
