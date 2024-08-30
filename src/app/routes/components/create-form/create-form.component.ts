import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
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
import { RoutesFacadeService } from '../../services/routes-facade/routes-facade.service';
import { requiredArray } from '../../validators/required-array/required-array.validator';
import { CarriagesFacade } from '../../../state/facades/carriages.facade';
import { map } from 'rxjs';
import { FilterByConnectionPipe } from '../../pipes/filter-by-connection/filter-by-connection.pipe';

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
  private routesFacade = inject(RoutesFacadeService);
  private carriagesFacade = inject(CarriagesFacade);

  public create = output();

  public form = this.formBuilder.group({
    path: this.formBuilder.control<number[]>(
      [],
      [requiredArray],
    ),
    carriages: this.formBuilder.control<string[]>(
      [],
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
    this.routesFacade.createRoute(this.form.getRawValue());

    console.log(this.form.getRawValue());

    //this.create.emit();
  }

  protected stringifyStation: TuiStringHandler<
    TuiContext<number>
  > = item => this.idToNameMap().get(item.$implicit)!;
}
