import {
  ChangeDetectionStrategy,
  Component,
  inject,
  INJECTOR,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  TuiButton,
  TuiDialogService,
} from '@taiga-ui/core';
import { AuthActions } from '../../../state/actions/auth.action';
import { ProfileFacade } from '../../services/profile-facade.service';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ChengePasswordDialogComponent } from '../chenge-password-dialog/chenge-password-dialog.component';

@Component({
  selector: 'tra-profile',
  standalone: true,
  imports: [TuiButton],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private store = inject(Store);
  private profileFacade = inject(ProfileFacade);
  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);

  public profile = this.profileFacade.profile;
  public isLoading = this.profileFacade.isLoading;
  public error = this.profileFacade.error;

  private readonly dialog = this.dialogs.open<number>(
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
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }

  public openChengePasswordDialog() {
    console.log('test');
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
