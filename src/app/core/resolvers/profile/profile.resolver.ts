import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { first } from 'rxjs';
import { ResolveFn } from '@angular/router';
import { selectAndFilterRoleAndError } from '../../utils/select-and-filter-role-and-error.util';

export const profileResolver: ResolveFn<unknown> = () => {
  const store = inject<Store<AppState>>(Store);

  return selectAndFilterRoleAndError(store).pipe(first());
};
