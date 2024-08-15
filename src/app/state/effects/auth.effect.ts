import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { AuthService } from '../../auth/services/auth/auth.service';
import { AuthActions } from '../actions/auth.action';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions = inject(Actions);
  private authService = inject(AuthService);

  public loginEffect = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.login),
      exhaustMap(data =>
        this.authService
          .login(data.email, data.password)
          .pipe(
            map(response =>
              AuthActions.loginSuccess(response),
            ),
          ),
      ),
    ),
  );
}
