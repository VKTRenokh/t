import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { selectRole } from '../../../state/selectors/user.selector';
import { filter, first } from 'rxjs';
import { isNotNullable } from '../../../shared/utils/is-not-nullables';

export const profileResolver = () =>
  inject<Store<AppState>>(Store)
    .select(selectRole)
    .pipe(filter(isNotNullable), first());
