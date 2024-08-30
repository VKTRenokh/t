import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { Carriage } from '../../interfaces/carriages.interface';
import { createCarriagesSeats as сreateCarriageSeats } from '../../utils/createCarriageSeats';
import { TuiButton } from '@taiga-ui/core';
import { CapitalizeWordsPipe } from '../../pipes/capitalize-words.pipe';

@Component({
  selector: 'tra-carriage',
  standalone: true,
  imports: [TuiButton, CapitalizeWordsPipe],
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
