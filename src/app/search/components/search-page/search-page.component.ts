import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk/date-time';
import { TuiInputDateTimeModule } from '@taiga-ui/legacy';

@Component({
  selector: 'tra-search-page',
  standalone: true,
  imports: [ReactiveFormsModule, TuiInputDateTimeModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  private formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    date: this.formBuilder.control([
      this.getNextTuiDay(),
      null,
    ]),
  });

  public getNextTuiDay() {
    const now = TuiDay.currentLocal();
    return new TuiDay(
      now.year,
      now.month,
      TuiDay.currentLocal().day + 1,
    );
  }
}
