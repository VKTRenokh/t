import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { AuthActions } from '../../state/actions/auth.action';

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

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
