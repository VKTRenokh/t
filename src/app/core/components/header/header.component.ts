import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { TuiIcon } from '@taiga-ui/core';
import { TuiBadge, TuiTabs } from '@taiga-ui/kit';
import { AuthFacade } from '../../../core/services/auth-facade.service';
import { AsyncPipe } from '@angular/common';
import { ProfileFacade } from '../../../profile/services/profile-facade.service';

@Component({
  selector: 'tra-header',
  standalone: true,
  imports: [
    TuiIcon,
    TuiBadge,
    TuiTabs,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private authFacade = inject(AuthFacade);
  private profileFacade = inject(ProfileFacade);

  public isLoggedIn = this.authFacade.isLoggedIn;
  public isAdmin: Signal<boolean> = computed(
    () => this.profileFacade.userRole() === 'manager',
  );
}
