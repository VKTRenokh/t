import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk/date-time';
import {
  TuiButton,
  TuiDataList,
  TuiIcon,
} from '@taiga-ui/core';
import {
  TuiInputDateTimeModule,
  TuiInputModule,
} from '@taiga-ui/legacy';
import { futureDateValidator } from '../../validators/future-date/future-date.validator';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import { GeocodingHttpService } from '../../services/geocoding-http.service';
import { Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Result } from '../../../core/models/geocoding-response';

@Component({
  selector: 'tra-search-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputDateTimeModule,
    TuiInputModule,
    TuiIcon,
    TuiButton,
    TuiDataListWrapper,
    TuiDataList,
    AsyncPipe,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  private formBuilder = inject(FormBuilder);
  protected geocodingHttpService = inject(
    GeocodingHttpService,
  );
  protected inputFromValue = new Subject<string>();
  protected inputToValue = new Subject<string>();
  protected townsFromArr: string[] = [];
  protected townsToArr: string[] = [];
  public form = this.formBuilder.group({
    from: this.formBuilder.control('', [
      Validators.required,
    ]),
    to: this.formBuilder.control('', [Validators.required]),
    date: this.formBuilder.control(
      [this.getNextTuiDay(), TuiTime.currentLocal()],
      [Validators.required, futureDateValidator],
    ),
  });

  constructor() {
    this.inputFromValue.subscribe(town => {
      this.geocodingHttpService
        .getTowns(town)
        .subscribe(item => {
          this.townsFromArr = this.getCitiesNames(
            item.results,
          );
        });
    });
    this.inputToValue.subscribe(town => {
      this.geocodingHttpService
        .getTowns(town)
        .subscribe(item => {
          this.townsToArr = this.getCitiesNames(
            item.results,
          );
        });
    });
  }

  private getCitiesNames(results: Result[]): string[] {
    const townArray = [];
    for (const element of results) {
      const city = element.components.city
        ? element.components.city
        : '';
      const state = element.components.state
        ? element.components.state
        : '';
      const country = element.components.country
        ? element.components.country
        : '';

      const fullCity = `${city} ${state} ${country}`;
      townArray.push(fullCity);
    }
    return townArray;
  }

  public getNextTuiDay() {
    const now = TuiDay.currentLocal();
    return new TuiDay(
      now.year,
      now.month,
      TuiDay.currentLocal().day + 1,
    );
  }

  public submit() {
    console.log('Submit');
  }
}
