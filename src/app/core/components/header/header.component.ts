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
import { AuthFacade } from '../../../core/services/auth-facade.service';
import { UserFacadeService } from '../../services/user-facade/user-facade.service';
import { map } from 'rxjs';
import { Roles } from '../../enums/role/role.enum';
import { AsyncPipe } from '@angular/common';

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
  private userFacade = inject(UserFacadeService);

  public isLoggedIn = this.authFacade.isLoggedIn;
  public isAdmin$ = this.userFacade
    .getRole()
    .pipe(map(role => role === Roles.Manager));
}
