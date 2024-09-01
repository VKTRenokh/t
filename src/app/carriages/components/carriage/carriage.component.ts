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
  public name = input.required<string>();

  public code = input<string>();

  public leftSeats = input.required<number>();

  public rightSeats = input.required<number>();

  public rows = input.required<number>();

  public updateCarriage = output<Carriage>();

  public rowsList = computed(() => {
    return сreateCarriageSeats(
      this.rows(),
      this.leftSeats(),
      this.rightSeats(),
    );
  });

  public onUpdate() {
    this.updateCarriage.emit({
      name: this.name(),
      code: this.code(),
      leftSeats: this.leftSeats(),
      rightSeats: this.rightSeats(),
      rows: this.rows(),
    });
  }
}
