import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { ProfileApiService } from '../../profile/services/profile-api.services';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { ProfileActions } from '../actions/profile.action';

@Injectable()
export class ProfileEffects {
  private actions = inject(Actions);
  private profileApiService = inject(ProfileApiService);

  public fetchProfile = createEffect(() =>
    this.actions.pipe(
      ofType(ProfileActions.fetchProfile),
      tap(() =>
        console.log(
          'Received ProfileActions.fetchProfile in ProfileEffects',
        ),
      ),
      exhaustMap(() =>
        this.profileApiService.getProfile().pipe(
          map(profile =>
            ProfileActions.fetchProfileSuccess({ profile }),
          ),
          catchError(error =>
            of(
              ProfileActions.fetchProfileFailure({ error }),
            ),
          ),
        ),
      ),
    ),
  );

  public updateProfile = createEffect(() =>
    this.actions.pipe(
      ofType(ProfileActions.updateProfile),
      exhaustMap(({ profile }) =>
        this.profileApiService.updateProfile(profile).pipe(
          map(updatedProfile =>
            ProfileActions.updateProfileSuccess({
              profile: updatedProfile,
            }),
          ),
          catchError(error =>
            of(
              ProfileActions.updateProfileFailure({
                error,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  public updatePassword = createEffect(() =>
    this.actions.pipe(
      ofType(ProfileActions.updatePassword),
      exhaustMap(({ password }) =>
        this.profileApiService
          .updatePassword(password)
          .pipe(
            map(() =>
              ProfileActions.updatePasswordSuccess(),
            ),
            catchError(error =>
              of(
                ProfileActions.updatePasswordFailure({
                  error,
                }),
              ),
            ),
          ),
      ),
    ),
  );
}
