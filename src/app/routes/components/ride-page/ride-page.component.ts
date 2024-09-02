import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TuiAccordion } from '@taiga-ui/kit';
import { RideFacadeService } from '../../services/ride/ride-facade.service';
import { Segment } from '../../models/ride/ride.model';

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
  public id = input<string>();

  private datePipe = inject(DatePipe);
  private rideFacade = inject(RideFacadeService);

  public ride = this.rideFacade.ride;
  public listOfStations = computed(() => {
    const route = this.ride();
    return route ? route.path : [];
  });

  public getPriceEntries(
    segment: Segment,
  ): [string, number][] {
    return Object.entries(segment.price);
  }

  public formatDate(date: string): string {
    return this.datePipe.transform(date, 'medium') || '';
  }

  public ngOnInit() {
    this.rideFacade.getRide(Number(this.id()));
  }

  public createRide() {
    console.log('create');
  }
}
