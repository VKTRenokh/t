import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'tra-create-form',
  standalone: true,
  imports: [],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent {}
