import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  TuiButton,
  TuiDialogService,
  TuiIcon,
} from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { Route } from '../models/routes.model';
import { RoutesFacade } from '../../state/facades/routes.facade';
import { StationsFacade } from '../../state/facades/stations.facade';
import { TUI_CONFIRM, TuiConfirmData } from '@taiga-ui/kit';
import { tap } from 'rxjs';

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

  private dialogs = inject(TuiDialogService);
  private routesFacade = inject(RoutesFacade);
  private stationsFacade = inject(StationsFacade);

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
    const data: TuiConfirmData = {
      content:
        'If you delete it, you will not be able to restore it',
      yes: 'I`m sure!',
      no: 'I`m not sure!',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Are you sure in deleting route?',
        size: 's',
        data,
      })
      .pipe(
        tap(() => {
          this.routesFacade.deleteRoute(
            this.routeInput().id,
          );
        }),
      )
      .subscribe();
  }

  protected handleUpdate() {
    this.routesFacade.updateRoute(
      this.routeInput().id,
      this.routeInput(),
    );
  }
}
