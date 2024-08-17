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
import { TuiInputDateModule } from '@taiga-ui/legacy';

@Component({
  selector: 'tra-search-page',
  standalone: true,
  imports: [ReactiveFormsModule, TuiInputDateModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  private formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    date: this.formBuilder.control(TuiDay.currentLocal()),
  });
}
