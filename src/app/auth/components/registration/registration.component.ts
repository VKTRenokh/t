import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiButton,
  TuiError,
  TuiLabel,
  TuiLink,
  TuiLoader,
} from '@taiga-ui/core';
import {
  TuiDataListWrapper,
  TuiEmailsPipe,
  TuiFieldErrorPipe,
} from '@taiga-ui/kit';

import {
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/legacy';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit/tokens';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { AuthActions } from '../../../state/actions/auth.action';
import {
  selectError,
  selectIsLoading,
  selectIsRegistered,
} from '../../../state/selectors/auth.selector';
import { filter, map } from 'rxjs';
import { isNotNullable } from '../../../shared/utils/is-not-nullables';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPasswordsMatch } from '../../../validators/password/is-passwords-match.validators';

@Component({
  selector: 'tra-registration',
  standalone: true,
  imports: [
    TuiEmailsPipe,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiDataListWrapper,
    ReactiveFormsModule,
    FormsModule,
    TuiButton,
    TuiLink,
    TuiLoader,
    RouterLink,
    TuiLabel,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        mustMatch: 'Password doesnt much',
        email: 'Email is invalid',
      },
    },
  ],
})
export class RegistrationComponent implements OnDestroy {
  private formGroup = inject(NonNullableFormBuilder);
  private store: Store<AppState> = inject(Store);
  private router = inject(Router);
  protected isLoading$ = this.store.select(selectIsLoading);
  protected error$ = this.store.select(selectError).pipe(
    filter(isNotNullable),
    map(error => error.message),
  );
  protected default = '';

  protected registrationForm = this.formGroup.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
      passwordRepeat: ['', [Validators.required]],
    },
    {
      validators: isPasswordsMatch(
        'password',
        'passwordRepeat',
      ),
    },
  );

  public get email() {
    return this.registrationForm.controls.email;
  }

  constructor() {
    this.store
      .select(selectIsRegistered)
      .pipe(
        filter(isRegistered => isRegistered),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  protected onSubmit() {
    const data = this.registrationForm.getRawValue();
    this.store.dispatch(AuthActions.registration(data));
  }

  public ngOnDestroy(): void {
    this.store.dispatch(AuthActions.resetError());
  }
}
