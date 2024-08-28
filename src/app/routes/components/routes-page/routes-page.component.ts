import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { RoutesService } from '../../services/routes/routes.service';
import { TuiButton } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tra-routes-page',
  standalone: true,
  imports: [TuiButton, RouterLink, AsyncPipe],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesPageComponent {
  private routesService = inject(RoutesService);
  public routes = this.routesService.get();

  constructor() {
    this.routesService.get().subscribe(console.log);
  }
}
