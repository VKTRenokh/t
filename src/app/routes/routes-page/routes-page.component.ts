import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { RoutesFormComponent } from '../routes-form/routes-form.component';
import { RoutesListComponent } from '../routes-list/routes-list.component';
import { RoutesFacade } from '../../state/facades/routes.facade';
import { StationsFacade } from '../../state/facades/stations.facade';

@Component({
  selector: 'tra-routes-page',
  standalone: true,
  imports: [RoutesFormComponent, RoutesListComponent],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesPageComponent {
  private routesFacade = inject(RoutesFacade);
  private stationsFacade = inject(StationsFacade);
  constructor() {
    this.routesFacade.getRoutes();
    this.stationsFacade.getStations();
  }
}
