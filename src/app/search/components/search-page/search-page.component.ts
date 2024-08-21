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
import {
  TuiDataListWrapper,
  TuiFilterByInputPipe,
  TuiStringifyContentPipe,
} from '@taiga-ui/kit';
import { GeocodingHttpService } from '../../services/geocoding-http.service';
import { AsyncPipe } from '@angular/common';
import { debounceTime, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    TuiStringifyContentPipe,
    TuiFilterByInputPipe,
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
  protected fromTowns$ =
    this.form.controls.from.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => {
        console.log(value);
        return this.geocodingHttpService.getTowns(
          value as string,
        );
      }),
      takeUntilDestroyed(),
    );
  protected readonly stringify = (item: Result): string =>
    `${item.components.city || ''} ${item.components.state || ''} ${item.components.country || ''}`;

  protected toTowns$ =
    this.form.controls.to.valueChanges.pipe(
      switchMap(value =>
        this.geocodingHttpService.getTowns(value as string),
      ),
      takeUntilDestroyed(),
    );

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
