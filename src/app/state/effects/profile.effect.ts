import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { ProfileApiService } from '../../profile/services/profile-api.services';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { ProfileActions } from '../actions/profile.action';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable()
export class ProfileEffects {
  private actions = inject(Actions);
  private profileApiService = inject(ProfileApiService);
  private alertService = inject(TuiAlertService);

  public fetchProfile = createEffect(() =>
    this.actions.pipe(
      ofType(ProfileActions.fetchProfile),
      exhaustMap(() =>
        this.profileApiService.getProfile().pipe(
          map(profile =>
            ProfileActions.fetchProfileSuccess({ profile }),
          ),
          catchError(response =>
            of(
              ProfileActions.fetchProfileFailure({
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
      ofType(ProfileActions.updateProfile),
      exhaustMap(({ profile }) =>
        this.profileApiService.updateProfile(profile).pipe(
          map(updatedProfile =>
            ProfileActions.updateProfileSuccess({
              profile: updatedProfile,
            }),
          ),
          catchError(response =>
            of(
              ProfileActions.updateProfileFailure({
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
      ofType(ProfileActions.updatePassword),
      exhaustMap(({ password }) =>
        this.profileApiService
          .updatePassword(password)
          .pipe(
            map(() =>
              ProfileActions.updatePasswordSuccess(),
            ),
            catchError(response =>
              of(
                ProfileActions.updatePasswordFailure({
                  error: response.error,
                }),
              ),
            ),
          ),
      ),
    ),
  );

  public showSuccessToast = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          ProfileActions.updateProfileSuccess,
          ProfileActions.updatePasswordSuccess,
        ),
        tap(() =>
          this.showToast(
            'Success',
            'Operation completed successfully',
            'success',
          ),
        ),
      ),
    { dispatch: false },
  );

  public showErrorToast = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          ProfileActions.fetchProfileFailure,
          ProfileActions.updateProfileFailure,
          ProfileActions.updatePasswordFailure,
        ),
        tap(({ error }) =>
          this.showToast('Error', error.message, 'error'),
        ),
      ),
    { dispatch: false },
  );

  private showToast(
    label: string,
    message: string,
    appearance: 'success' | 'error',
  ): void {
    this.alertService
      .open(message, { label, appearance })
      .subscribe();
  }
}
