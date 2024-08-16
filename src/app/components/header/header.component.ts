import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TuiIcon } from '@taiga-ui/core';
import { TuiBadge, TuiTabs } from '@taiga-ui/kit';
import { AppState } from '../../state/app.state';
import { selectIsAuthorized } from '../../state/selectors/auth.selector';

@Component({
  selector: 'tra-header',
  standalone: true,
  imports: [TuiIcon, TuiBadge, TuiTabs],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  private store = inject(Store<AppState>);
  public isLoggedIn = signal(false);

  constructor() {
    this.store
      .select(selectIsAuthorized)
      .subscribe(isAuthorized =>
        this.isLoggedIn.set(isAuthorized),
      );
  }

  toHome(): void {
    this.router.navigate(['/']);
  }

  toProfile(): void {
    this.router.navigate(['/profile']);
  }

  toLogin(): void {
    this.router.navigate(['/login']);
  }
}
