import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { selectRole } from '../../../state/selectors/user.selector';
import { filter, first, tap } from 'rxjs';
import { isNotNullable } from '../../../shared/utils/is-not-nullables';
import { ResolveFn } from '@angular/router';

export const profileResolver: ResolveFn<
  string | void
> = () =>
  inject<Store<AppState>>(Store)
    .select(selectRole)
    .pipe(
      filter(role => isNotNullable(role)),
      first(),
      tap(console.log),
    );
