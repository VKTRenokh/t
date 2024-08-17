import { NgIf, AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  TuiBreakpointService,
  TuiButton,
  TuiSizeL,
} from '@taiga-ui/core';
import { TuiBlockStatus } from '@taiga-ui/layout';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'tra-not-found',
  standalone: true,
  imports: [NgIf, AsyncPipe, TuiBlockStatus, TuiButton],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  protected readonly breakpointService = inject(
    TuiBreakpointService,
  );
  private router = inject(Router);

  protected size$: Observable<TuiSizeL> =
    this.breakpointService.pipe(
      map(key => (key === 'mobile' ? 'm' : 'l')),
    );

  public goHome() {
    this.router.navigate(['/']);
  }
}
