import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { selectAndFilterRoleAndError } from '../../utils/select-and-filter-role-and-error.util';

export const managerGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject<Store<AppState>>(Store);

  return selectAndFilterRoleAndError(store).pipe(
    map(({ role, error }) =>
      role === 'manager' && !error
        ? true
        : router.createUrlTree(['/']),
    ),
  );
};
