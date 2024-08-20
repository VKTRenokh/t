import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { first } from 'rxjs';
import { ResolveFn } from '@angular/router';
import { selectAndFilterRoleAndError } from '../../utils/select-and-filter-role-and-error.util';

export const profileResolver: ResolveFn<unknown> = () =>
  selectAndFilterRoleAndError(
    inject<Store<AppState>>(Store),
  ).pipe(first());
