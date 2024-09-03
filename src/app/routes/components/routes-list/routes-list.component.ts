import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { RouteComponent } from '../route/route.component';
import { RoutesFacade } from '../../../state/facades/routes.facade';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { TuiPagination } from '@taiga-ui/kit';
import { TuiError } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { Route } from '../../models/route/route.model';

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
  public edit = output<Route | undefined>();
  private routesFacade = inject(RoutesFacade);
  protected store = inject(Store<AppState>);
  protected routes = this.routesFacade.routes;
  protected paginatedRoutes =
    this.routesFacade.paginatedRoutes;
  protected currentPage = this.routesFacade.currentPage;
  protected totalPages = this.routesFacade.totalPages;
  protected error$ = this.routesFacade.error$;

  protected handleOutput(event: Route | undefined) {
    this.edit.emit(event);
  }

  protected goToPage(pageNumber: number) {
    this.routesFacade.changePage(pageNumber);
  }
}
