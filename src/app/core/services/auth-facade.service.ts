import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../../state/app.state';
import { initialState } from '../../state/reducers/auth.reducer';
import { selectIsAuthorized } from '../../state/selectors/auth.selector';
import { Actions, ofType } from '@ngrx/effects';
import { AuthActions } from '../../state/actions/auth.action';
import { take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private router = inject(Router);

  public isLoggedIn = toSignal(
    this.store.select(selectIsAuthorized),
    { initialValue: initialState.isAuthorized },
  );

  public logout() {
    this.store.dispatch(AuthActions.logout());
    this.actions$
      .pipe(
        ofType(AuthActions.logoutSuccess),
        take(1),
        tap(() => this.router.navigate(['/search'])),
      )
      .subscribe();
  }
}
