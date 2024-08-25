import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../../state/app.state';
import { initialState } from '../../state/reducers/auth.reducer';
import { selectIsAuthorized } from '../../state/selectors/auth.selector';

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
