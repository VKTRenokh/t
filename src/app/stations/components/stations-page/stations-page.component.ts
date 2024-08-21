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
import { TuiButton } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';

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
  ],
  templateUrl: './stations-page.component.html',
  styleUrl: './stations-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsPageComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  public form = this.formBuilder.group({
    latLng: this.formBuilder.control(defaultLatLng),
    city: this.formBuilder.control('', [
      Validators.required,
    ]),
  });

  constructor() {
    this.form.controls.latLng.valueChanges.subscribe(
      console.log,
    );
  }

  public onSubmit() {
    console.dir(this.form.getRawValue(), { depth: null });
  }
}
