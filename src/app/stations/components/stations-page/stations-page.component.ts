import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { StationsListComponent } from '../../../stations/components/stations/stations-list.component';
import {
  defaultLatLng,
  MapComponent,
} from '../map/map.component';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import {
  TuiButton,
  TuiError,
  TuiNumberFormat,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiInputNumberModule,
} from '@taiga-ui/legacy';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tra-stations-page',
  standalone: true,
  imports: [
    MapComponent,
    ReactiveFormsModule,
    AsyncPipe,
    StationsListComponent,
    TuiButton,
    TuiInputModule,
    TuiError,
    TuiInputNumberModule,
    TuiFieldErrorPipe,
    TuiNumberFormat,
  ],
  templateUrl: './stations-page.component.html',
  styleUrl: './stations-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsPageComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  public numberFormat = { precision: 15 };
  public form = this.formBuilder.group({
    latLng: this.formBuilder.control(defaultLatLng),
    city: this.formBuilder.control('', [
      Validators.required,
    ]),
    lat: this.formBuilder.control(0),
    lng: this.formBuilder.control(0),
  });

  constructor() {
    this.form.controls.latLng.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(latLng => {
        this.form.patchValue({ ...latLng });
      });
  }

  public onSubmit() {
    console.dir(this.form.getRawValue(), { depth: null });
  }
}
