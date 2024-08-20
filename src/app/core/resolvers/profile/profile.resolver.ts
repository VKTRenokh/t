import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { selectRoleAndError } from '../../../state/selectors/user.selector';
import { filter, first, map } from 'rxjs';
import { isNotNullable } from '../../../shared/utils/is-not-nullables';
import { ResolveFn } from '@angular/router';

export const profileResolver: ResolveFn<
  string | void
> = () => {
  const store = inject<Store<AppState>>(Store);

  return store.select(selectRoleAndError).pipe(
    filter(
      ({ error, role }) =>
        isNotNullable(role) || isNotNullable(error),
    ),
    map(() => undefined),
    first(),
  );
};
