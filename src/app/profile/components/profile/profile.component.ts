import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  INJECTOR,
} from '@angular/core';
import { ProfileFacade } from '../../services/profile-facade.service';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/legacy';
import {
  TuiButton,
  TuiDialogService,
  TuiError,
  TuiIcon,
  TuiLoader,
  TuiTextfield,
} from '@taiga-ui/core';
import { emailValidator } from '../../../auth/validators/email/email.validator';
import { AsyncPipe } from '@angular/common';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { AuthFacade } from '../../../core/services/auth-facade.service';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'tra-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiButton,
    AsyncPipe,
    TuiFieldErrorPipe,
    TuiError,
    TuiLoader,
    TuiIcon,
    TuiTextfield,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private profileFacade = inject(ProfileFacade);
  private readonly dialogs = inject(TuiDialogService);
  private formBuilder = inject(NonNullableFormBuilder);
  private authFacade = inject(AuthFacade);

  private readonly injector = inject(INJECTOR);

  public profile = this.profileFacade.profile;
  public isLoading = this.profileFacade.isLoading;
  public error = this.profileFacade.error;

  public editingField: 'name' | 'email' | null = null;

  public nameControl = this.formBuilder.control(
    '',
    Validators.required,
  );

  public emailControl = this.formBuilder.control('', [
    Validators.required,
    emailValidator,
  ]);

  public formDisabled = computed(
    () => this.editingField === null,
  );

  private readonly dialog = this.dialogs.open(
    new PolymorpheusComponent(
      ChangePasswordDialogComponent,
      this.injector,
    ),
    {
      dismissible: true,
      label: 'Change Password',
    },
  );

  constructor() {
    effect(() => {
      this.initForm();
    });
  }

  private initForm(): void {
    const currentProfile = this.profile();
    if (currentProfile) {
      this.nameControl.setValue(currentProfile.name || '');
      this.emailControl.setValue(currentProfile.email);
    }
    this.nameControl.disable();
    this.emailControl.disable();
  }

  public startEditing(field: 'name' | 'email'): void {
    this.editingField = field;
    if (field === 'name') {
      this.nameControl.enable();
    } else {
      this.emailControl.enable();
    }
  }

  public saveChanges(field: 'name' | 'email'): void {
    const control =
      field === 'name'
        ? this.nameControl
        : this.emailControl;
    if (control.invalid) {
      return;
    }

    const updatedValue = {
      [field]: control.value,
    };
    this.profileFacade.updateProfile(updatedValue);
    this.profileFacade.updateProfileSuccess$
      .pipe(take(1))
      .subscribe(() => {
        this.editingField = null;
        control.disable();
      });
  }

  public cancelEditing(field: 'name' | 'email'): void {
    this.editingField = null;
    const control =
      field === 'name'
        ? this.nameControl
        : this.emailControl;
    control.disable();
    this.initForm();
  }

  public logout() {
    this.authFacade.logout();
  }

  public openChangePasswordDialog() {
    this.dialog.subscribe();
  }
}
