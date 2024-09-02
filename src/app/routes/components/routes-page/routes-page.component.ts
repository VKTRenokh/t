import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  TuiButton,
  TuiExpand,
  TuiExpandComponent,
} from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { CreateFormComponent } from '../create-form/create-form.component';
import { RoutesFacadeService } from '../../services/routes-facade/routes-facade.service';
import { CarriagesFacade } from '../../../state/facades/carriages.facade';
import { RoutesListComponent } from '../routes-list/routes-list.component';
import { StationsFacade } from '../../../state/facades/stations.facade';

@Component({
  selector: 'tra-routes-page',
  standalone: true,
  imports: [
    TuiButton,
    RouterLink,
    CreateFormComponent,
    TuiExpand,
    RoutesListComponent,
  ],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'onResize()',
  },
})
export class RoutesPageComponent {
  private routesFacade = inject(RoutesFacadeService);
  private stationsFacade = inject(StationsFacade);
  private carriagesFacade = inject(CarriagesFacade);
  private expandCdr = viewChild.required(
    TuiExpandComponent,
    { read: ChangeDetectorRef },
  );

  public isCreating = signal(false);
  public routes = this.routesFacade.routes;

  constructor() {
    this.routesFacade.getRoutes();
    this.carriagesFacade.getCarriages();
    this.stationsFacade.getStations();
  }

  public create() {
    this.isCreating.set(true);
  }

  public closeCreationForm() {
    this.isCreating.set(false);
  }

  public onResize(): void {
    this.expandCdr().detectChanges();
  }
}
