import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TuiButton, TuiExpand } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { CreateFormComponent } from '../create-form/create-form.component';
import { RoutesFacadeService } from '../../services/routes-facade/routes-facade.service';
import { CarriagesFacade } from '../../../state/facades/carriages.facade';

@Component({
  selector: 'tra-routes-page',
  standalone: true,
  imports: [
    TuiButton,
    RouterLink,
    CreateFormComponent,
    TuiExpand,
  ],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesPageComponent {
  private routesFacade = inject(RoutesFacadeService);
  private carriagesFacade = inject(CarriagesFacade);

  public isCreating = signal(false);
  public routes = this.routesFacade.routes;

  constructor() {
    this.routesFacade.getRoutes();
    this.carriagesFacade.getCarriages();
  }

  public create() {
    this.isCreating.set(true);
  }

  public closeCreationForm() {
    this.isCreating.set(false);
  }
}
