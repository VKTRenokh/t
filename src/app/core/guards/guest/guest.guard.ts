import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { inject } from '@angular/core';
import { selectIsAuthorized } from '../../../state/selectors/auth.selector';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject<Store<AppState>>(Store)
    .select(selectIsAuthorized)
    .pipe(
      map(isAuthroized => {
        if (isAuthroized) {
          return router.createUrlTree(['/']);
        }
        return true;
      }),
    );
};
