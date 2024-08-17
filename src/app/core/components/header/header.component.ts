import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TuiIcon } from '@taiga-ui/core';
import { TuiBadge, TuiTabs } from '@taiga-ui/kit';
import { AuthFacade } from '../../../state/facades/auth.facade';

@Component({
  selector: 'tra-header',
  standalone: true,
  imports: [TuiIcon, TuiBadge, TuiTabs],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private router = inject(Router);
  private authFacade = inject(AuthFacade);
  public isLoggedIn = this.authFacade.isLoggedIn;

  public toHome(): void {
    this.router.navigate(['/']);
  }

  public toProfile(): void {
    this.router.navigate(['/profile']);
  }

  public toLogin(): void {
    this.router.navigate(['/login']);
  }
}
