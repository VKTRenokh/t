import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  FormArray,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiButton, TuiDataList } from '@taiga-ui/core';
import { StationsFacade } from '../../../state/facades/stations.facade';
import { TuiSelectModule } from '@taiga-ui/legacy';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import type { TuiStringHandler } from '@taiga-ui/cdk';
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
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private stationsFacade = inject(StationsFacade);

  public form = this.formBuilder.group({
    stations: this.formBuilder.array([
      this.createStationFormControl(),
    ]),
  });

  public stations = this.stationsFacade.stations;

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

  protected stringify: TuiStringHandler<Station> = item =>
    item.city;
}
