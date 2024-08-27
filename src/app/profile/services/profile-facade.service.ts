import {
  computed,
  inject,
  Injectable,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../../state/app.state';
import {
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from '../../state/selectors/profile.selector';
import { ProfileActions } from '../../state/actions/profile.action';
import { Profile } from '../models/profile.model';
import { Actions, ofType } from '@ngrx/effects';
import { profileInitialState } from '../../state/reducers/profile.reducer';

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);

  public profile = toSignal(
    this.store.select(selectProfile),
    { initialValue: null },
  );
  public userRole = computed(
    () => this.profile()?.role ?? null,
  );
  public isLoading = toSignal(
    this.store.select(selectProfileLoading),
    { initialValue: profileInitialState.loading },
  );

  public error = toSignal(
    this.store.select(selectProfileError),
    { initialValue: null },
  );

  public fetchProfile() {
    this.store.dispatch(ProfileActions.fetchProfile());
  }

  public updateProfile(profile: Partial<Profile>) {
    this.store.dispatch(
      ProfileActions.updateProfile({ profile }),
    );
  }

  public updatePassword(password: string) {
    this.store.dispatch(
      ProfileActions.updatePassword({ password }),
    );
  }

  public resetError() {
    this.store.dispatch(ProfileActions.resetError());
  }

  public updateProfileSuccess$ = this.actions$.pipe(
    ofType(ProfileActions.updateProfileSuccess),
  );
}
