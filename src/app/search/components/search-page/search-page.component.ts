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
import { TuiDay } from '@taiga-ui/cdk/date-time';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import {
  TuiInputDateTimeModule,
  TuiInputModule,
} from '@taiga-ui/legacy';

@Component({
  selector: 'tra-search-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputDateTimeModule,
    TuiInputModule,
    TuiIcon,
    TuiButton,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  private formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    from: this.formBuilder.control('', [
      Validators.required,
    ]),
    to: this.formBuilder.control('', [Validators.required]),
    date: this.formBuilder.control(
      [this.getNextTuiDay(), null],
      [Validators.required],
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
}
