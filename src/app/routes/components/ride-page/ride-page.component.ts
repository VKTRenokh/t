import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

@Component({
  selector: 'tra-ride-page',
  standalone: true,
  imports: [],
  templateUrl: './ride-page.component.html',
  styleUrl: './ride-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RidePageComponent {
  public id = input.required<string>();
}
