import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { Carriage } from '../../interfaces/carriages.interface';

@Component({
  selector: 'tra-carriage',
  standalone: true,
  imports: [NgFor],
  templateUrl: './carriage.component.html',
  styleUrl: './carriage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageComponent {
  @Input() public carriageProps!: Carriage;
}
