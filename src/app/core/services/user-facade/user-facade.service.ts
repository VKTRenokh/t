import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { selectRole } from '../../../state/selectors/user.selector';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  private store: Store<AppState> = inject(Store);

  public getRole() {
    return this.store.select(selectRole);
  }
}
