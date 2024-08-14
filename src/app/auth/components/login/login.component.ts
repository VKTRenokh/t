import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/legacy';

@Component({
  selector: 'tra-login',
  standalone: true,
  imports: [ReactiveFormsModule, TuiInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  public loginForm = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.email]),
  });
}
