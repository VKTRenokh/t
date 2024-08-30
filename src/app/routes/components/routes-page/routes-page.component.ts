import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RoutesService } from '../../services/routes/routes.service';
import { TuiButton, TuiExpand } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CreateFormComponent } from '../create-form/create-form.component';
import { map } from 'rxjs';

@Component({
  selector: 'tra-routes-page',
  standalone: true,
  imports: [
    TuiButton,
    RouterLink,
    AsyncPipe,
    CreateFormComponent,
    TuiExpand,
  ],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesPageComponent {
  private routesService = inject(RoutesService);
  public routes = this.routesService
    .get()
    .pipe(map(arr => arr.slice(-10)));

  public isCreating = signal(false);

  constructor() {
    this.routesService.get().subscribe(console.log);
  }

  public create() {
    this.isCreating.set(true);
  }

  public closeCreationForm() {
    this.isCreating.set(false);
  }
}
