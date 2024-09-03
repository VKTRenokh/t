import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { RideFacadeService } from '../../services/ride/ride-facade.service';

@Component({
  selector: 'tra-create-ride',
  standalone: true,
  imports: [ReactiveFormsModule, TuiButton],
  templateUrl: './create-ride.component.html',
  styleUrl: './create-ride.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRideComponent {
  public id = input.required<number>();

  private formBuilder = inject(FormBuilder);
  private rideFacade = inject(RideFacadeService);

  public form = this.formBuilder.group({});

  public submit() {
    this.rideFacade.createRide(this.id(), []);
  }
}
