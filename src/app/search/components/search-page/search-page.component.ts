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
  TuiComboBoxModule,
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
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NominatimResponse } from '../../../core/models/geocoding-response';

@Component({
  selector: 'tra-search-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputDateTimeModule,
    TuiInputModule,
    TuiIcon,
    TuiButton,
    TuiDataList,
    TuiStringifyContentPipe,
    TuiComboBoxModule,
    TuiFilterByInputPipe,
    TuiDataListWrapper,
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
    from: this.formBuilder.control<string>('', [
      Validators.required,
    ]),
    to: this.formBuilder.control<string>('', [
      Validators.required,
    ]),
    date: this.formBuilder.control(
      [this.getNextTuiDay(), TuiTime.currentLocal()],
      [Validators.required, futureDateValidator],
    ),
  });

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

  protected fromAddress$ =
    this.form.controls.from.valueChanges.pipe(
      this.autocompleteRequest.bind(this),
    );

  protected toAddress$ =
    this.form.controls.to.valueChanges.pipe(
      this.autocompleteRequest.bind(this),
    );

  protected onSelect(address: NominatimResponse) {
    const fullAddress = `${address.address.city} ${address.address.state || ''} ${address.address.country}`;
    this.form.get('from')!.setValue(fullAddress);
  }

  private autocompleteRequest(
    value: Observable<string | null>,
  ) {
    return value.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap(value =>
        this.geocodingHttpService.getAddress(value),
      ),
      takeUntilDestroyed(),
    );
  }
}
