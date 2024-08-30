import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { Carriage } from '../../interfaces/carriages.interface';
import { CreateCarriageSeats as сreateCarriageSeats } from '../../utils/createCarriageSeats';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'tra-carriage',
  standalone: true,
  imports: [TuiButton],
  templateUrl: './carriage.component.html',
  styleUrl: './carriage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageComponent {
  public carriageProps = input.required<Carriage>();

  public updateCarriage = output<Carriage>({
    alias: 'updataeCarriage',
  });

  public rows = computed(() => {
    return сreateCarriageSeats(
      this.carriageProps().rows,
      this.carriageProps().leftSeats,
      this.carriageProps().rightSeats,
    );
  });

  public onUpdate() {
    this.updateCarriage.emit(this.carriageProps());
  }
}
