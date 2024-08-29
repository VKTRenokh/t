import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  FormArray,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiButton, TuiDataList } from '@taiga-ui/core';
import { StationsFacade } from '../../../state/facades/stations.facade';
import {
  TuiHideSelectedPipe,
  TuiMultiSelectModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import type {
  TuiContext,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import { Station } from '../../../stations/models/station/station.model';

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
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private stationsFacade = inject(StationsFacade);

  public form = this.formBuilder.group({
    stations: this.formBuilder.control<string[]>([]),
  });

  public stationsNonNullable = computed(() => {
    const stations = this.stationsFacade.stations();
    return stations ? stations : [];
  });

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
  }

  private createStationFormControl() {
    return this.formBuilder.control<Station | null>(null);
  }

  public get stationsFormArray() {
    return this.form.get('stations') as FormArray;
  }

  public submit() {
    console.log('submit');
  }

  public resetStationValue(i: number) {
    this.stationsFormArray.at(i).patchValue(null);
  }

  protected stringify: TuiStringHandler<
    TuiContext<number>
  > = item => {
    return this.idToNameMap().get(item.$implicit)!;
  };
}
