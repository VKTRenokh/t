import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { UserService } from '../../core/services/user/user.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UserActions } from '../actions/user.action';
import { AuthActions } from '../actions/auth.action';

@Injectable()
export class UserEffects {
  private actions = inject(Actions);
  private userService = inject(UserService);

  public initEffect = createEffect(() =>
    this.actions.pipe(
      ofType(ROOT_EFFECTS_INIT, AuthActions.loginSuccess),
      exhaustMap(() =>
        this.userService.profile().pipe(
          map(user =>
            UserActions.loadProfileSuccess({ user }),
          ),
          catchError(response =>
            of(
              UserActions.failure({
                error: response.error,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  public updateProfile = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.updateProfile),
      exhaustMap(({ user }) =>
        this.userService.updateProfile(user).pipe(
          map(updatedProfile =>
            UserActions.updateProfileSuccess({
              user: updatedProfile,
            }),
          ),
          catchError(response =>
            of(
              UserActions.failure({
                error: response.error,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  public updatePassword = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.updatePassword),
      exhaustMap(({ password }) =>
        this.userService.updatePassword(password).pipe(
          map(() => UserActions.updatePasswordSuccess()),
          catchError(response =>
            of(
              UserActions.failure({
                error: response.error,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
