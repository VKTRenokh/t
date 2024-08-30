import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

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
  ],
  templateUrl: './carriages-page.component.html',
  styleUrl: './carriages-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriagesPageComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  private carriagesFacade = inject(CarriagesFacade);

  public carriages = this.carriagesFacade.carriages;

  public displayForm = false;

  public updateMode = false;

  public codeForUpdate = '';

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

  public ngOnInit(): void {
    this.carriagesFacade.getCarriages();
  }

  public toggleDisplayForm() {
    this.displayForm = !this.displayForm;
  }

  public onSubmit() {
    const formData = this.carriagesForm.getRawValue();

    if (this.updateMode) {
      this.carriagesFacade.updateCarriage({
        ...formData,
        code: this.codeForUpdate,
      });
      this.updateMode = false;
      this.displayForm = false;
    } else {
      this.carriagesFacade.createCarriage(formData);
    }
    this.carriagesForm.reset();
  }

  public upadateCarriage(carriage: Carriage) {
    this.carriagesForm.patchValue({
      name: carriage.name,
      rows: carriage.rows,
      leftSeats: carriage.leftSeats,
      rightSeats: carriage.rightSeats,
    });

    this.updateMode = true;
    this.displayForm = true;

    this.codeForUpdate = carriage.code;
  }
}
