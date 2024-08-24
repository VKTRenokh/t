import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { StationsListComponent } from '../../../stations/components/stations/stations-list.component';
import {
  defaultLatLng,
  MapComponent,
} from '../map/map.component';
import {
  FormArray,
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
  TuiSelectModule,
} from '@taiga-ui/legacy';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { LatLng } from 'leaflet';
import { StationsService } from '../../services/stations/stations.service';
import { Station } from '../../models/station/station.model';

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
    TuiSelectModule,
  ],
  templateUrl: './stations-page.component.html',
  styleUrl: './stations-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsPageComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);
  private stationsService = inject(StationsService);

  public stations = signal<Station[] | undefined>(
    undefined,
  );
  public cities = computed(() => {
    const stations = this.stations();
    return stations
      ? stations.map(station => station.city)
      : [];
  });
  public cityToIdMap = computed(() => {
    const stations = this.stations();
    return new Map(
      stations
        ? stations.map(station => [
            station.city,
            station.id,
          ])
        : [],
    );
  });
  public numberFormat = { precision: 15 };
  public form = this.formBuilder.group({
    latLng: this.formBuilder.control(defaultLatLng),
    city: this.formBuilder.control('', [
      Validators.required,
    ]),
    lat: this.formBuilder.control<number | null>(null, [
      Validators.required,
    ]),
    lng: this.formBuilder.control<number | null>(null, [
      Validators.required,
    ]),
    relations: this.formBuilder.array([
      this.createRelationControl(),
    ]),
  });

  public get relations() {
    return this.form.get('relations') as FormArray;
  }

  public createRelationControl() {
    return this.formBuilder.control('', [
      Validators.required,
    ]);
  }

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

    this.stationsService
      .get()
      .subscribe(value => this.stations.set(value));

    this.form.controls.relations.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(cities => {
        this.handleRelationsChange(cities);
      });
  }

  private addNewRelationsInput() {
    this.relations.push(this.createRelationControl());
  }

  private clearEmptyInputs(relations: string[]) {
    if (relations.length <= 1) {
      return;
    }

    const lastInputValue = relations.at(-1);
    const secondLastInputValue = relations.at(-2);

    if (!secondLastInputValue && !lastInputValue) {
      this.relations.removeAt(this.relations.length - 1);
    }
  }

  private handleRelationsChange(relations: string[]) {
    const lastValue = relations.at(-1);

    if (
      lastValue &&
      this.relations.length === relations.length
    ) {
      this.addNewRelationsInput();
    }

    this.clearEmptyInputs(relations);
  }

  public convertCityNamesToIds(names: string[]) {
    const map = this.cityToIdMap();

    return names.map(name => map.get(name)).filter(Boolean);
  }

  public onSubmit() {
    const values = this.form.getRawValue();

    console.log({
      city: values.city,
      latitude: values.lat!,
      longitude: values.lng!,
      relations: this.convertCityNamesToIds(
        values.relations,
      ),
    });
  }
}
