import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiButton,
  TuiError,
  TuiIcon,
} from '@taiga-ui/core';
import { RideFacadeService } from '../../services/ride/ride-facade.service';
import {
  TuiInputDateTimeModule,
  TuiInputNumberModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { StationIdToNamePipe } from '../../pipes/station-id-to-name/station-id-to-name.pipe';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tra-create-ride',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiInputDateTimeModule,
    TuiTextfieldControllerModule,
    TuiInputNumberModule,
    TuiIcon,
    TuiFieldErrorPipe,
    TuiError,
    StationIdToNamePipe,
    AsyncPipe,
  ],
  templateUrl: './create-ride.component.html',
  styleUrl: './create-ride.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRideComponent implements OnInit {
  public id = input.required<number>();
  public path = input.required<number[]>();
  public carriages = input.required<string[]>();

  private formBuilder = inject(FormBuilder);
  private rideFacade = inject(RideFacadeService);

  public form!: FormGroup;

  public createPriceControl() {
    return this.formBuilder.control<string | null>(null, [
      Validators.required,
    ]);
  }

  public createSegmentFormGroup() {
    return this.formBuilder.group({
      departure: this.formBuilder.control<
        [TuiDay, TuiTime] | null
      >(null, [Validators.required]),
      arrival: this.formBuilder.control<
        [TuiDay, TuiTime] | null
      >(null, [Validators.required]),
      price: this.formBuilder.array(
        this.carriages().map(() =>
          this.createPriceControl(),
        ),
      ),
    });
  }

  public ngOnInit(): void {
    console.log(this.carriages());

    this.form = this.formBuilder.group({
      segments: this.formBuilder.array(
        this.path().map(() =>
          this.createSegmentFormGroup(),
        ),
      ),
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
