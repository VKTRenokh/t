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
import { CarriagesFacade } from '../../../state/facades/carriages.facade';
import { RoutesListComponent } from '../routes-list/routes-list.component';
import { StationsFacade } from '../../../state/facades/stations.facade';
import { RoutesFacade } from '../../../state/facades/routes.facade';
import { Route } from '../../models/route/route.model';

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
  private routesFacade = inject(RoutesFacade);
  private stationsFacade = inject(StationsFacade);
  private carriagesFacade = inject(CarriagesFacade);
  private expandCdr = viewChild.required(
    TuiExpandComponent,
    { read: ChangeDetectorRef },
  );
  public edit = signal<Route | undefined>(undefined);

  public isFormOpened = signal(false);
  public routes = this.routesFacade.routes;

  constructor() {
    this.routesFacade.getRoutes();
    this.carriagesFacade.getCarriages();
    this.stationsFacade.getStations();
  }

  public handleEditedData(event: Route | undefined) {
    this.isFormOpened.set(true);
    console.log(event);
    this.edit.set(event);
  }

  public create() {
    this.isFormOpened.set(true);
  }

  public closeForm() {
    this.isFormOpened.set(false);
    this.edit.set(undefined);
  }

  public onResize(): void {
    this.expandCdr().detectChanges();
  }
}
