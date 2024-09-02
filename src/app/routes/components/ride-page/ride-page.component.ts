import { DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TuiAccordion } from '@taiga-ui/kit';
import { tap } from 'rxjs';

interface Segment {
  time: [string, string];
  price: Record<string, number>;
}

interface Ride {
  rideId: number;
  segments: Segment[];
}

interface Route {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Ride[];
}

@Component({
  selector: 'tra-ride-page',
  standalone: true,
  imports: [
    TuiAccordion,
    TuiButton,
    RouterLink,
    NgIf,
    NgFor,
  ],
  templateUrl: './ride-page.component.html',
  styleUrl: './ride-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class RidePageComponent implements OnInit {
  private datePipe = inject(DatePipe);
  public id = input<string>();
  public route = signal<Route | null>(null);

  public listOfStations = computed(() => {
    const route = this.route();
    return route ? route.path : [];
  });

  private http = inject(HttpClient);

  public getRoute() {
    return this.http
      .get<Route>(`/api/route/${this.id()}`)
      .pipe(
        tap(result =>
          console.log('Profile fetched:', result),
        ),
      );
  }

  public getPriceEntries(
    segment: Segment,
  ): [string, number][] {
    return Object.entries(segment.price);
  }

  public formatDate(date: string): string {
    return this.datePipe.transform(date, 'medium') || '';
  }

  public ngOnInit() {
    this.getRoute().subscribe({
      next: data => {
        this.route.set(data);
        console.log('Profile data:', data);
        console.log(
          'List of stations:',
          this.listOfStations(),
        );
      },
      error: error =>
        console.error('Error fetching profile:', error),
    });
  }

  public createRide() {
    console.log('create');
  }
}
