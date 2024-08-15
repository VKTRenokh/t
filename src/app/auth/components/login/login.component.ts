import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiButton,
  TuiError,
  TuiLoader,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/legacy';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { AuthActions } from '../../../state/actions/auth.action';
import {
  selectError,
  selectIsLoading,
} from '../../../state/selectors/auth.selector';
import { isNotNullable } from '../../../shared/utils/is-not-nullables';
import { filter, map } from 'rxjs';

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
    TuiLoader,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private store: Store<AppState> = inject(Store);
  public isLoading$ = this.store.select(selectIsLoading);
  public error$ = this.store.select(selectError).pipe(
    filter(isNotNullable),
    map(error => error.message),
  );

  constructor() {
    this.error$.subscribe(console.log);
  }

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
