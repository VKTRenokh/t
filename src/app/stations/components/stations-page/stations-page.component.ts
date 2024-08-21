import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
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
import { Observable } from 'rxjs';
import { LatLng } from 'leaflet';

@Component({
  selector: 'tra-stations-page',
  standalone: true,
  imports: [
    MapComponent,
    ReactiveFormsModule,
    AsyncPipe,
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
  private destroyRef = inject(DestroyRef);

  public numberFormat = { precision: 15 };
  public form = this.formBuilder.group({
    latLng: this.formBuilder.control(defaultLatLng),
    city: this.formBuilder.control('', [
      Validators.required,
    ]),
    lat: this.formBuilder.control<number | null>(null),
    lng: this.formBuilder.control<number | null>(null),
  });

  public bindLatLng(value: Observable<number | null>) {
    // TODO: refactor this
    value
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() =>
        this.form.patchValue(
          {
            latLng: new LatLng(
              this.form.controls.lat.value ?? 0,
              this.form.controls.lng.value ?? 0,
            ),
          },
          { emitEvent: false },
        ),
      );
  }

  constructor() {
    this.form.controls.latLng.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(latLng => {
        this.form.patchValue({ ...latLng });
      });

    // TODO: refactor this
    this.bindLatLng(this.form.controls.lat.valueChanges);
    this.bindLatLng(this.form.controls.lng.valueChanges);
  }

  public onSubmit() {
    console.dir(this.form.getRawValue(), { depth: null });
  }
}
