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
  protected inputValue = new Subject<string>();
  protected townsArr: string[] = [];
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
    this.inputValue.subscribe(town => {
      this.geocodingHttpService
        .getTowns(town)
        .subscribe(item => {
          this.townsArr = [];
          for (const element of item.results) {
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
            this.townsArr.push(fullCity);
          }
        });
    });
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
