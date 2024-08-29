import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

import { CarriagesListComponent } from '../carriages-list/carriages-list.component';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/legacy';

@Component({
  selector: 'tra-carriages-page',
  standalone: true,
  imports: [
    TuiButton,
    CarriagesListComponent,
    ReactiveFormsModule,
    FormsModule,
    TuiInputModule,
  ],
  templateUrl: './carriages-page.component.html',
  styleUrl: './carriages-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriagesPageComponent {
  private fb = inject(NonNullableFormBuilder);

  public displayForm = false;

  protected carriagesForm = this.fb.group({
    name: ['', Validators.required],
    rows: ['', Validators.required],
    leftSeats: ['', Validators.required],
    rightSeats: ['', Validators.required],
  });

  public toggleDisplayForm() {
    this.displayForm = !this.displayForm;
  }
}
