import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TuiButton, TuiError } from '@taiga-ui/core';

import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/legacy';
import { CarriagesFacade } from '../../../state/facades/carriages.facade';
import { CarriageComponent } from '../carriage/carriage.component';
import { Carriage } from '../../interfaces/carriages.interface';
import { AsyncPipe } from '@angular/common';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';

@Component({
  selector: 'tra-carriages-page',
  standalone: true,
  imports: [
    TuiButton,
    ReactiveFormsModule,
    FormsModule,
    TuiInputModule,
    CarriageComponent,
    AsyncPipe,
    TuiError,
    TuiFieldErrorPipe,
  ],
  templateUrl: './carriages-page.component.html',
  styleUrl: './carriages-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriagesPageComponent {
  private fb = inject(NonNullableFormBuilder);

  private carriagesFacade = inject(CarriagesFacade);

  public carriages = this.carriagesFacade.carriages;

  public displayForm = signal(false);

  public updateMode = false;

  public codeForUpdate: string | undefined = '';

  public error = this.carriagesFacade.error;

  protected carriagesForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    rows: this.fb.control(1, [
      Validators.required,
      Validators.max(20),
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    leftSeats: this.fb.control(1, [
      Validators.required,
      Validators.max(4),
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    rightSeats: this.fb.control(1, [
      Validators.required,
      Validators.max(4),
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor() {
    this.carriagesFacade.getCarriages();
  }

  public toggleDisplayForm() {
    this.displayForm.update(value => !value);
  }
  public onSubmit() {
    const formData = this.carriagesForm.getRawValue();

    if (this.updateMode) {
      this.carriagesFacade.updateCarriage({
        ...formData,
        code: this.codeForUpdate,
      });
      this.updateMode = false;
    } else {
      this.carriagesFacade.createCarriage(formData);
    }
    this.carriagesForm.reset();
    this.displayForm.set(false);
  }

  public updateCarriage(carriage: Carriage) {
    this.carriagesForm.patchValue({ ...carriage });

    this.updateMode = true;
    this.displayForm.set(true);

    this.codeForUpdate = carriage.code;
  }
}
