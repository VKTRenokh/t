import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../../state/app.state';
import {
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from '../../state/selectors/profile.selector';

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {
  private store = inject(Store<AppState>);

  public profile = toSignal(
    this.store.select(selectProfile),
    {
      initialValue: null,
    },
  );

  public isLoading = toSignal(
    this.store.select(selectProfileLoading),
    {
      initialValue: false,
    },
  );

  public error = toSignal(
    this.store.select(selectProfileError),
    {
      initialValue: null,
    },
  );
}
