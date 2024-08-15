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
import {
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/legacy';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { AuthActions } from '../../../state/actions/auth.action';

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
    TuiInputPasswordModule,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private store: Store<AppState> = inject(Store);
  public isLoading = this.store.select('auth', 'loading');

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

    this.store.dispatch(AuthActions.login(data));
  }
}
