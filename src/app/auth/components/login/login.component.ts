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
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

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
  private router = inject(Router);
  private auth = inject(AuthService);

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

  public onSubmit() {
    const data = this.loginForm.getRawValue();
    this.auth.signup(data.email, data.password).subscribe({
      error: a => console.log('a', a),
      next: b => console.log('b', b),
    });
  }
}
