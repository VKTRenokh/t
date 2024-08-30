import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
} from '@angular/core';
import { Carriage } from '../../interfaces/carriages.interface';
import { CreateCarriageSeats } from '../../utils/createCarriageSeats';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'tra-carriage',
  standalone: true,
  imports: [TuiButton],
  templateUrl: './carriage.component.html',
  styleUrl: './carriage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageComponent implements OnInit {
  public carriageProps = input.required<Carriage>();

  public updateCarriage = output<Carriage>({
    alias: 'updataeCarriage',
  });

  public rows: {
    leftSeats: number[];
    rightSeats: number[];
  }[] = [];

  public ngOnInit(): void {
    this.rows = CreateCarriageSeats(
      this.carriageProps().rows,
      this.carriageProps().leftSeats,
      this.carriageProps().rightSeats,
    );
  }

  public onUpdate() {
    this.updateCarriage.emit(this.carriageProps());
  }
}
