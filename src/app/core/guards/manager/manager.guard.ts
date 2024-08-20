import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { inject } from '@angular/core';
import { selectRoleAndError } from '../../../state/selectors/user.selector';
import { filter, map } from 'rxjs';
import { isNotNullable } from '../../../shared/utils/is-not-nullables';

export const managerGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject<Store<AppState>>(Store);

  return store.select(selectRoleAndError).pipe(
    filter(
      ({ error, role }) =>
        isNotNullable(role) || isNotNullable(error),
    ),
    map(({ role, error }) =>
      role === 'manager' && !error
        ? true
        : router.createUrlTree(['/']),
    ),
  );
};
