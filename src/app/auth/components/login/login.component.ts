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
import {
  TuiButton,
  TuiError,
  TuiLink,
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
  selectIsAuthorized,
  selectIsLoading,
} from '../../../state/selectors/auth.selector';
import { isNotNullable } from '../../../shared/utils/is-not-nullables';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

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
    TuiLink,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private store: Store<AppState> = inject(Store);
  private router = inject(Router);

  public isLoading$ = this.store.select(selectIsLoading);
  public error$ = this.store.select(selectError).pipe(
    filter(isNotNullable),
    map(error => error.message),
  );

  constructor() {
    this.store
      .select(selectIsAuthorized)
      .pipe(
        filter(isAuthorized => isAuthorized),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
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
