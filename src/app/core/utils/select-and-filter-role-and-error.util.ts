import { selectRoleAndError } from '../../state/selectors/user.selector';

import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { filter } from 'rxjs';
import { isNotNullable } from '../../shared/utils/is-not-nullables';

export const selectAndFilterRoleAndError = (
  store: Store<AppState>,
) =>
  store
    .select(selectRoleAndError)
    .pipe(
      filter(
        value =>
          isNotNullable(value.role) ||
          isNotNullable(value.error),
      ),
    );
