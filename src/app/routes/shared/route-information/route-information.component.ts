import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

@Component({
  selector: 'tra-route-information',
  standalone: true,
  imports: [],
  templateUrl: './route-information.component.html',
  styleUrl: './route-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteInformationComponent {
  public routeInput = input.required<
    number[] | (string | undefined)[]
  >();
}
