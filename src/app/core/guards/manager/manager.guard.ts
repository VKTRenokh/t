import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { inject } from '@angular/core';
import { selectRole } from '../../../state/selectors/user.selector';
import { map, skip } from 'rxjs';

export const managerGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject<Store<AppState>>(Store)
    .select(selectRole)
    .pipe(
      skip(1),
      map(role =>
        role === 'manager'
          ? true
          : router.createUrlTree(['/search']),
      ),
    );
};
