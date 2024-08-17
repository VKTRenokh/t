import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../app.state';
import { selectIsAuthorized } from '../selectors/auth.selector';
import { initialState } from '../reducers/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private store = inject(Store<AppState>);

  public isLoggedIn = toSignal(
    this.store.select(selectIsAuthorized),
    { initialValue: initialState.isAuthorized },
  );
}
