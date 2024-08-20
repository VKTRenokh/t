import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { TuiIcon } from '@taiga-ui/core';
import { TuiBadge, TuiTabs } from '@taiga-ui/kit';
import { AuthFacade } from '../../../state/facades/auth.facade';

@Component({
  selector: 'tra-header',
  standalone: true,
  imports: [
    TuiIcon,
    TuiBadge,
    TuiTabs,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private authFacade = inject(AuthFacade);

  public isLoggedIn = this.authFacade.isLoggedIn;
}
