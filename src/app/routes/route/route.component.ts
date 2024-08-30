import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { Route } from '../models/routes.model';
import { RoutesFacade } from '../../state/facades/routes.facade';
import { StationsFacade } from '../../state/facades/stations.facade';

@Component({
  selector: 'tra-route',
  standalone: true,
  imports: [TuiButton, TuiIcon, TuiCardLarge, TuiHeader],
  templateUrl: './route.component.html',
  styleUrl: './route.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteComponent {
  public routeInput = input.required<Route>();
  private routesFacade = inject(RoutesFacade);
  private stationsFacade = inject(StationsFacade);

  constructor() {
    const a = this.stationsFacade.stations;
    console.log(a());
  }

  protected convertPathToStations() {
    const stations = this.stationsFacade.stations();
    if (!stations) {
      return this.routeInput().path;
    }
    return this.routeInput().path.map(
      path =>
        stations.find(station => station.id === path)?.city,
    );
  }

  protected handleDelete() {
    this.routesFacade.deleteRoutes(this.routeInput().id);
  }

  protected handleUpdate() {
    this.routesFacade.updateRoutes(
      this.routeInput().id,
      this.routeInput(),
    );
  }
}
