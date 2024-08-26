import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  TuiButton,
  TuiLoader,
  TuiLabel,
  TuiError,
} from '@taiga-ui/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipe,
} from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/legacy';
import { isPasswordsMatch } from '../../../auth/validators/password/is-passwords-match.validators';
import { ProfileFacade } from '../../services/profile-facade.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tra-change-password-dialog',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiInputPasswordModule,
    ReactiveFormsModule,
    FormsModule,
    TuiButton,
    TuiLoader,
    TuiLabel,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        mustMatch: 'Password doesnt much',
      },
    },
  ],
})
export class ChangePasswordDialogComponent {
  private profileFacade = inject(ProfileFacade);
  private formGroup = inject(NonNullableFormBuilder);
  protected isLoading = this.profileFacade.isLoading;
  protected error = this.profileFacade.error;

  protected changePasswordForm = this.formGroup.group(
    {
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

  protected onSubmit() {
    const { password } =
      this.changePasswordForm.getRawValue();
    this.profileFacade.updatePassword(password);
  }
}
