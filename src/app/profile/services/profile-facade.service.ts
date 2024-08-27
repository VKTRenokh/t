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
  selectError,
} from '../../state/selectors/user.selector';
import { UserActions } from '../../state/actions/user.action';
import { Profile } from '../../core/models/profile/profile.model';
import { Actions, ofType } from '@ngrx/effects';
import { initialState } from '../../state/reducers/user.reducer';

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
    { initialValue: initialState.loading },
  );

  public error = toSignal(this.store.select(selectError), {
    initialValue: null,
  });

  public updateProfile(user: Partial<Profile>) {
    this.store.dispatch(
      UserActions.updateProfile({ user }),
    );
  }

  public updatePassword(password: string) {
    this.store.dispatch(
      UserActions.updatePassword({ password }),
    );
  }

  public resetError() {
    this.store.dispatch(UserActions.resetError());
  }

  public updateProfileSuccess$ = this.actions$.pipe(
    ofType(UserActions.updateProfileSuccess),
  );
}
