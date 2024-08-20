import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { inject } from '@angular/core';
import { selectRole } from '../../../state/selectors/user.selector';
import { map, switchMap, tap } from 'rxjs';
import { selectError } from '../../../state/selectors/auth.selector';

export const managerGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject<Store<AppState>>(Store);

  return store.select(selectRole).pipe(
    switchMap(role =>
      store.select(selectError).pipe(
        map(error =>
          role === 'manager' && !error
            ? true
            : router.parseUrl('/search'),
        ),
        tap(console.log),
      ),
    ),
  );
};
