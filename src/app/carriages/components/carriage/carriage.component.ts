import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Carriage } from '../../interfaces/carriages.interface';
import { CreateCarriageSeats } from '../../utils/createCarriageSeats';

@Component({
  selector: 'tra-carriage',
  standalone: true,
  imports: [NgFor],
  templateUrl: './carriage.component.html',
  styleUrl: './carriage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageComponent implements OnInit {
  @Input() public carriageProps!: Carriage;

  public rows: {
    leftSeats: number[];
    rightSeats: number[];
  }[] = [];

  public ngOnInit(): void {
    this.rows = CreateCarriageSeats(
      this.carriageProps.rows,
      this.carriageProps.leftSeats,
      this.carriageProps.rightSeats,
    );
  }
}
