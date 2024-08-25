import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  INJECTOR,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthActions } from '../../../state/actions/auth.action';
import { ProfileFacade } from '../../services/profile-facade.service';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ChengePasswordDialogComponent } from '../chenge-password-dialog/chenge-password-dialog.component';
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
} from '@taiga-ui/core';
import { emailValidator } from '../../../auth/validators/email/email.validator';
import { selectProfileError } from '../../../state/selectors/profile.selector';
import { filter, map } from 'rxjs';
import { isNotNullable } from '../../../shared/utils/is-not-nullables';
import { AsyncPipe } from '@angular/common';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';

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
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private store = inject(Store);
  private profileFacade = inject(ProfileFacade);
  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);
  private formBuilder = inject(NonNullableFormBuilder);

  public error$ = this.store
    .select(selectProfileError)
    .pipe(
      filter(isNotNullable),
      map(error => error.message),
    );

  public profile = this.profileFacade.profile;
  public isLoading = this.profileFacade.isLoading;
  public error = this.profileFacade.error;

  public isEditing = signal(false);

  public profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: this.formBuilder.control('', [
      Validators.required,
      emailValidator,
    ]),
  });

  public formDisabled = computed(() => !this.isEditing());

  private readonly dialog = this.dialogs.open(
    new PolymorpheusComponent(
      ChengePasswordDialogComponent,
      this.injector,
    ),
    {
      dismissible: true,
      label: 'Chenge Password',
    },
  );

  constructor() {
    console.log(this.profile());
    this.initForm();
  }

  private initForm(): void {
    const currentProfile = this.profile();
    if (currentProfile) {
      this.profileForm.patchValue({
        name: currentProfile.name,
        email: currentProfile.email,
      });
    }
    this.profileForm.disable();
  }

  public startEditing(): void {
    this.isEditing.set(true);
    this.profileForm.enable();
  }

  public saveChanges(): void {
    if (this.profileForm.valid) {
      const data = this.profileForm.getRawValue();
      console.log(data);
      this.isEditing.set(false);
      this.profileForm.disable();
    }
  }

  public cancelEditing(): void {
    this.initForm();
    this.isEditing.set(false);
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }

  public openChangePasswordDialog() {
    this.dialog.subscribe({
      next: data => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }
}
