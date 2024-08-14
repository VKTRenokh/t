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
import { TuiButton, TuiError } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';

const minPasswordLength = 8;

@Component({
  selector: 'tra-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiError,
    TuiFieldErrorPipe,
    TuiButton,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  public loginForm = this.formBuilder.group({
    email: this.formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(minPasswordLength),
    ]),
  });
}
