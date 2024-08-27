import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CarriagesFacade } from '../../../state/facades/carriages.facade';
import { CarriageComponent } from '../carriage/carriage.component';

@Component({
  selector: 'tra-carriages-list',
  standalone: true,
  imports: [CarriageComponent],
  templateUrl: './carriages-list.component.html',
  styleUrl: './carriages-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriagesListComponent implements OnInit {
  private carriagesFacade = inject(CarriagesFacade);

  public carriages = this.carriagesFacade.carriages;

  public ngOnInit(): void {
    this.carriagesFacade.getCarriages();
  }
}
