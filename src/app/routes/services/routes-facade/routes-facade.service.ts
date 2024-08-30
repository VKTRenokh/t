import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoutesActions } from '../../../state/actions/routes.action';

@Injectable({
  providedIn: 'root',
})
export class RoutesFacadeService {
  private store = inject(Store);

  public getRoutes() {
    this.store.dispatch(RoutesActions.getRoutes());
  }
}
