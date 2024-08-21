import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { StationsListComponent } from '../../../stations/components/stations/stations-list.component';
import { MapComponent } from '../map/map.component';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tra-stations-page',
  standalone: true,
  imports: [
    MapComponent,
    ReactiveFormsModule,
    AsyncPipe,
    StationsListComponent,
  ],
  templateUrl: './stations-page.component.html',
  styleUrl: './stations-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsPageComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  public form = this.formBuilder.group({
    latLng: this.formBuilder.control(null),
  });

  constructor() {
    this.form.controls.latLng.valueChanges.subscribe(
      console.log,
    );
  }
}
