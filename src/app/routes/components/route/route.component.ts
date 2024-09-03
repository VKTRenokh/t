import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  TuiButton,
  TuiDialogService,
  TuiIcon,
} from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { Route } from '../../models/routes.model';
import { RoutesFacade } from '../../../state/facades/routes.facade';
import { StationsFacade } from '../../../state/facades/stations.facade';
import { TUI_CONFIRM, TuiConfirmData } from '@taiga-ui/kit';
import { RouteInformationComponent } from '../../shared/route-information/route-information.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tra-route',
  standalone: true,
  imports: [
    TuiButton,
    TuiIcon,
    TuiCardLarge,
    TuiHeader,
    RouterLink,
    RouteInformationComponent,
  ],
  templateUrl: './route.component.html',
  styleUrl: './route.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteComponent {
  public routeInput = input.required<Route>();
  public edit = output<Route | undefined>();

  private dialogs = inject(TuiDialogService);
  private routesFacade = inject(RoutesFacade);
  private stationsFacade = inject(StationsFacade);

  constructor() {
    this.edit.emit(undefined);
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
    const data: TuiConfirmData = {
      content:
        'If you delete it, you will not be able to restore it',
      yes: 'I`m sure!',
      no: 'I`m not sure!',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label:
          'Are you sure you want to delete this route?',
        size: 's',
        data,
      })
      .subscribe(() =>
        this.routesFacade.deleteRoute(this.routeInput().id),
      );
  }

  protected handleUpdate() {
    console.log('fuckkk');
    this.edit.emit(this.routeInput());
  }
}
