import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
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
import { debounceTime, Observable, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NominatimResponse } from '../../../core/models/geocoding-response';
import { FilterComponent } from '../filter/filter.component';
import { SearchFacadeService } from '../../services/search-facade/search-facade.service';
import { addSpace } from '../../utils/add-space/add-space.util';

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
    FilterComponent,
    AsyncPipe,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  private formBuilder = inject(FormBuilder);
  private searchFacade = inject(SearchFacadeService);
  protected geocodingHttpService = inject(
    GeocodingHttpService,
  );

  public form = this.formBuilder.group({
    from: this.formBuilder.control<
      NominatimResponse | string
    >('', [Validators.required]),
    to: this.formBuilder.control<
      NominatimResponse | string
    >('', [Validators.required]),
    date: this.formBuilder.control<[TuiDay, TuiTime]>(
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

  private from = signal<NominatimResponse | undefined>(
    undefined,
  );
  private to = signal<NominatimResponse | undefined>(
    undefined,
  );

  private getTime() {
    const value = this.form.getRawValue();

    if (!value.date) {
      return;
    }

    const day = value.date[0];
    const time = value.date[1];

    const nativeTime = day.toLocalNativeDate().getTime();

    return time
      ? nativeTime + time.toAbsoluteMilliseconds()
      : nativeTime;
  }

  public async submit() {
    const from = this.from();
    const to = this.to();

    if (!from || !to) {
      return;
    }

    const time = this.getTime()!;

    this.searchFacade.search(
      [from.lat, from.lon],
      [to.lat, to.lon],
      time,
    );
  }

  protected fromAddress$ =
    this.form.controls.from.valueChanges.pipe(
      this.autocompleteRequest.bind(this),
    );

  protected toAddress$ =
    this.form.controls.to.valueChanges.pipe(
      this.autocompleteRequest.bind(this),
    );

  private stringifyAddress(address: NominatimResponse) {
    return `${address.address.city ?? ''}${addSpace(address.address.state) ?? ''}${addSpace(address.address.country) ?? ''}`.trim();
  }

  private getCitySignal(
    control: string,
  ): WritableSignal<NominatimResponse | undefined> {
    //@ts-expect-error !!!!!!!!!
    return this[control];
  }

  protected onSelect(
    address: NominatimResponse,
    control: string,
  ) {
    const fullAddress = this.stringifyAddress(address);
    this.form.get(control)!.setValue(fullAddress);

    this.getCitySignal(control).set(address);
  }

  private autocompleteRequest(
    value: Observable<NominatimResponse | string | null>,
  ) {
    return value.pipe(
      debounceTime(300),
      switchMap(value =>
        this.geocodingHttpService.getAddress(value),
      ),
      takeUntilDestroyed(),
    );
  }
}
