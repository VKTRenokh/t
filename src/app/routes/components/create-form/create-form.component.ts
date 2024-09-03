import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import {
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
import { AsyncPipe } from '@angular/common';
import { requiredArray } from '../../validators/required-array/required-array.validator';
import { CarriagesFacade } from '../../../state/facades/carriages.facade';
import { map } from 'rxjs';
import { FilterByConnectionPipe } from '../../pipes/filter-by-connection/filter-by-connection.pipe';
import { Route } from '../../models/routes.model';
import { RoutesFacade } from '../../../state/facades/routes.facade';

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
    FilterByConnectionPipe,
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private stationsFacade = inject(StationsFacade);
  private routesFacade = inject(RoutesFacade);
  private carriagesFacade = inject(CarriagesFacade);

  public create = output();
  public edit = input<Route | undefined>();

  private updatingPath = computed(() => {
    const updateData = this.edit();
    console.log(updateData);
    return updateData ? updateData.path : [];
  });
  private updatingCarriages = computed(() => {
    const updateData = this.edit();
    return updateData ? updateData.carriages : [];
  });

  public form = this.formBuilder.group({
    path: this.formBuilder.control<number[]>(
      this.updatingPath(),
      [requiredArray],
    ),
    carriages: this.formBuilder.control<string[]>(
      this.updatingCarriages(),
      [requiredArray],
    ),
  });

  public stationsNonNullable = computed(
    () => this.stationsFacade.stations() ?? [],
  );

  public stationIds = computed(() =>
    this.stationsNonNullable().map(station => station.id),
  );
  public carriages = this.carriagesFacade.carriages.pipe(
    map(carriages =>
      carriages.map(carriage => carriage.code),
    ),
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
  }

  public submit() {
    const updateData = this.edit();
    console.log(updateData);
    if (!updateData) {
      this.routesFacade.createRoute(
        this.form.getRawValue(),
      );
    } else {
      console.log(this.form.getRawValue());
      this.routesFacade.updateRoute(
        updateData.id,
        this.form.getRawValue(),
      );
    }

    this.create.emit();
  }

  protected stringifyStation: TuiStringHandler<
    TuiContext<number>
  > = item => this.idToNameMap().get(item.$implicit)!;
}
