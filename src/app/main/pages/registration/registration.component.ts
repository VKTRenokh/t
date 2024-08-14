import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiButton,
  TuiError,
  TuiLabel,
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
import { isPasswordsMatch } from '../../../validators/password/isPasswordsMatch.validators';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit/tokens';

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
export class RegistrationComponent {
  private formGroup = inject(FormBuilder);
  protected default = '';
  protected readonly emails = [
    'google.com',
    'github.com',
    'taiga-ui.dev',
  ];

  protected registrationForm =
    this.formGroup.nonNullable.group(
      {
        email: [
          '',
          [Validators.required, Validators.email],
        ],
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
}
