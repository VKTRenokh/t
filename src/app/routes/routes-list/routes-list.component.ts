import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { RouteComponent } from '../route/route.component';
import { RoutesFacade } from '../../state/facades/routes.facade';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { selectRoutesError } from '../../state/selectors/routes.selector';
import { filter, map } from 'rxjs';
import { isNotNullable } from '../../shared/utils/is-not-nullables';
import { TuiPagination } from '@taiga-ui/kit';
import { TuiError } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tra-routes-list',
  standalone: true,
  imports: [
    RouteComponent,
    TuiPagination,
    TuiError,
    AsyncPipe,
  ],
  templateUrl: './routes-list.component.html',
  styleUrl: './routes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesListComponent {
  private routesFacade = inject(RoutesFacade);
  protected store = inject(Store<AppState>);
  protected routes = this.routesFacade.routes;
  protected paginatedRoutes =
    this.routesFacade.paginatedRoutes;
  protected error$ = this.store
    .select(selectRoutesError)
    .pipe(
      filter(isNotNullable),
      map(error => error.message),
    );
  protected currentPage = this.routesFacade.currentPage;
  protected totalPages = this.routesFacade.totalPages;

  constructor() {
    console.log(this.paginatedRoutes());
  }

  protected goToPage(pageNumber: number) {
    this.routesFacade.changePage(pageNumber);
  }
}
