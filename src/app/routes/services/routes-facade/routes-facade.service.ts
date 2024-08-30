import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoutesActions } from '../../../state/actions/routes.action';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectRoutes } from '../../../state/selectors/routes.selector';

@Injectable({
  providedIn: 'root',
})
export class RoutesFacadeService {
  private store = inject(Store);

  public routes = toSignal(this.store.select(selectRoutes));

  public getRoutes() {
    this.store.dispatch(RoutesActions.getRoutes());
  }
}
