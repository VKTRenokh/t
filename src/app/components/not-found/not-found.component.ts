import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { interval, takeWhile, tap, finalize } from 'rxjs';

@Component({
  selector: 'tra-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  private router = inject(Router);
  public counter = 5;

  constructor() {
    interval(1000)
      .pipe(
        takeWhile(() => this.counter > 0),
        tap(() => {
          this.counter -= 1;
        }),
        finalize(() => this.router.navigate(['/'])),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
