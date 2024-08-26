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

  public profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: this.formBuilder.control('', [
      Validators.required,
      emailValidator,
    ]),
  });

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
      this.profileForm.patchValue({
        name: currentProfile.name || '',
        email: currentProfile.email,
      });
    }
    this.profileForm.disable();
  }

  public startEditing(field: 'name' | 'email'): void {
    this.editingField = field;
    this.profileForm.controls[field].enable();
  }

  public saveChanges(field: 'name' | 'email'): void {
    if (this.profileForm.controls[field].invalid) {
      return;
    }

    const updatedValue = {
      [field]: this.profileForm.controls[field].value,
    };
    this.profileFacade.updateProfile(updatedValue);
    this.profileFacade.updateProfileSuccess$.subscribe(
      () => {
        this.editingField = null;
        this.profileForm.controls[field].disable();
      },
    );
  }

  public cancelEditing(field: 'name' | 'email'): void {
    this.editingField = null;
    this.profileForm.get(field)?.disable();
  }

  public logout() {
    this.authFacade.logout();
  }

  public openChangePasswordDialog() {
    this.dialog.subscribe();
  }
}
