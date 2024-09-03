import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { RideFacadeService } from '../../services/ride/ride-facade.service';
import { TuiInputDateTimeModule } from '@taiga-ui/legacy';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';

@Component({
  selector: 'tra-create-ride',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiInputDateTimeModule,
  ],
  templateUrl: './create-ride.component.html',
  styleUrl: './create-ride.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRideComponent {
  public id = input.required<number>();

  private formBuilder = inject(FormBuilder);
  private rideFacade = inject(RideFacadeService);

  public form = this.formBuilder.group({
    segments: this.formBuilder.array([
      this.createSegmentFormGroup(),
    ]),
  });

  public createSegmentFormGroup() {
    return this.formBuilder.group({
      departure: this.formBuilder.control<
        [TuiDay, TuiTime] | null
      >(null),
      arrival: this.formBuilder.control<
        [TuiDay, TuiTime] | null
      >(null),
      price: this.formBuilder.array([
        this.formBuilder.control<string | null>(null),
      ]),
    });
  }

  public get segments() {
    return this.form.get('segments') as FormArray;
  }

  public getSegmentPrices(i: number) {
    return this.segments
      .get(i.toString())
      ?.get('price') as FormArray;
  }

  public submit() {
    console.log(this.form.getRawValue());
    //this.rideFacade.createRide(this.id(), []);
  }
}
