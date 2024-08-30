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
import { TuiButton, TuiDataList } from '@taiga-ui/core';
import { StationsFacade } from '../../../state/facades/stations.facade';
import {
  TuiMultiSelectModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import type {
  TuiContext,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import { TuiHeader } from '@taiga-ui/layout';
import { HttpClient } from '@angular/common/http';

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
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private stationsFacade = inject(StationsFacade);
  private http = inject(HttpClient);

  public create = output();

  public form = this.formBuilder.group({
    stations: this.formBuilder.control<string[]>([]),
    carriages: this.formBuilder.control<number[]>([]),
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
      console.log,
    );

    this.http.get('/api/carriage').subscribe(console.log);
  }

  public get stationsFormArray() {
    return this.form.get('stations') as FormArray;
  }

  public submit() {
    console.log('submit');
    this.create.emit();
  }

  public resetStationValue(i: number) {
    this.stationsFormArray.at(i).patchValue(null);
  }

  protected stringifyStation: TuiStringHandler<
    TuiContext<number>
  > = item => this.idToNameMap().get(item.$implicit)!;
}
