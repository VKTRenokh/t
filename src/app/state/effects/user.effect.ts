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

@Injectable()
export class UserEffects {
  private actions = inject(Actions);
  private userService = inject(UserService);

  public initEffect = createEffect(() =>
    this.actions.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(() =>
        this.userService.profile().pipe(
          map(user =>
            UserActions.loadProfileSuccess({ user }),
          ),
          catchError(response =>
            of(
              UserActions.loadProfileFailure({
                error: response.error,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
