import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
} from '@angular/core';
import {
  FormArray,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  TuiButton,
  TuiDataList,
  TuiError,
} from '@taiga-ui/core';
import { StationsFacade } from '../../../state/facades/stations.facade';
import {
  TuiMultiSelectModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import {
  TuiDataListWrapper,
  TuiFieldErrorPipe,
} from '@taiga-ui/kit';
import type {
  TuiContext,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import { TuiHeader } from '@taiga-ui/layout';
import { HttpClient } from '@angular/common/http';
import { CreateRoute } from '../../models/create-route/create-route.model';
import { AsyncPipe } from '@angular/common';
import { RoutesFacadeService } from '../../services/routes-facade/routes-facade.service';
import { requiredArray } from '../../validators/required-array/required-array.validator';

@Component({
  selector: 'tra-create-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiSelectModule,
    TuiDataList,
    TuiDataListWrapper,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiHeader,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private stationsFacade = inject(StationsFacade);
  private routesFacade = inject(RoutesFacadeService);
  private http = inject(HttpClient);

  public create = output();

  public form = this.formBuilder.group({
    stations: this.formBuilder.control<number[]>(
      [],
      [requiredArray],
    ),
    carriages: this.formBuilder.control<number[]>(
      [],
      [requiredArray],
    ),
  });

  public stationsNonNullable = computed(
    () => this.stationsFacade.stations() ?? [],
  );

  public ids = computed(() =>
    this.stationsNonNullable().map(station => station.id),
  );

  public idToNameMap = computed(
    () =>
      new Map(
        this.stationsNonNullable().map(station => [
          station.id,
          station.city,
        ]),
      ),
  );

  constructor() {
    this.stationsFacade.getStations();

    this.form.controls.stations.valueChanges.subscribe(
      () => {
        console.log(this.form.invalid);
      },
    );

    this.http.get('/api/carriage').subscribe(console.log);
  }

  public get stationsFormArray() {
    return this.form.get('stations') as FormArray;
  }

  public getValue(): CreateRoute {
    const value = this.form.getRawValue();

    return {
      carriages: ['carriage_type_a'],
      path: value.stations,
    };
  }

  public submit() {
    this.routesFacade.createRoute(this.getValue());

    this.create.emit();
  }

  protected stringifyStation: TuiStringHandler<
    TuiContext<number>
  > = item => this.idToNameMap().get(item.$implicit)!;
}
