import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

import { CarriagesListComponent } from '../carriages-list/carriages-list.component';

@Component({
  selector: 'tra-carriages-page',
  standalone: true,
  imports: [TuiButton, CarriagesListComponent],
  templateUrl: './carriages-page.component.html',
  styleUrl: './carriages-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriagesPageComponent {}
