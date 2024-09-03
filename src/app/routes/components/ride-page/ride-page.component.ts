import { CommonModule, DatePipe } from '@angular/common';
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
import {
  TuiButton,
  TuiDialogService,
  TuiIcon,
} from '@taiga-ui/core';
import {
  TUI_CONFIRM,
  TuiAccordion,
  TuiConfirmData,
} from '@taiga-ui/kit';
import { RideFacadeService } from '../../services/ride/ride-facade.service';
import {
  TuiInputDateTimeModule,
  TuiInputNumberModule,
} from '@taiga-ui/legacy';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Ride,
  Segment,
} from '../../models/ride/ride.model';
import { RideComponent } from '../ride/ride.component';
import { switchMap } from 'rxjs';
import { CreateRideComponent } from '../create-ride/create-ride.component';
import { StationsFacade } from '../../../state/facades/stations.facade';
import { TuiCardLarge } from '@taiga-ui/layout';

interface EditingState {
  time: boolean;
  price: boolean;
}

type TempRideData = Record<
  number,
  {
    segments: {
      price: Record<string, number>;
      time: string[];
    }[];
  }
>;

@Component({
  selector: 'tra-ride-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TuiAccordion,
    TuiButton,
    TuiIcon,
    TuiInputNumberModule,
    RouterLink,
    RideComponent,
    ReactiveFormsModule,
    TuiInputDateTimeModule,
    CreateRideComponent,
    TuiCardLarge,
  ],
  templateUrl: './ride-page.component.html',
  styleUrl: './ride-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class RidePageComponent implements OnInit {
  public id = input.required<string>();
  public idNumber = computed(() => Number(this.id()));
  public isCreating = signal(false);

  private datePipe = inject(DatePipe);
  private rideFacade = inject(RideFacadeService);

  private readonly dialogs = inject(TuiDialogService);
  private stationsFacade = inject(StationsFacade);

  public ride = this.rideFacade.ride;
  public listOfStations = computed(() => {
    const route = this.ride();
    return route ? route.path : [];
  });
  public carriages = computed(() => {
    const route = this.ride();
    return route ? route.carriages : [];
  });

  public editingState: Record<
    number,
    Record<number, EditingState>
  > = {};
  public tempData: TempRideData = {};

  public formatDate(date: string): string {
    try {
      const formattedDate = this.datePipe.transform(
        date,
        'medium',
      );
      if (formattedDate === null) {
        throw new Error(
          'Date transformation returned null',
        );
      }
      return formattedDate;
    } catch (error) {
      console.error('Error formatting date:', date, error);
      return 'Invalid Date';
    }
  }

  constructor() {
    this.stationsFacade.getStations();
  }

  public getPriceEntries(
    segment: Segment,
  ): [string, number][] {
    return Object.entries(segment.price);
  }

  public ngOnInit() {
    this.rideFacade.getRide(this.id()!);
  }

  public isThisDateInFuture(compareDate: string): boolean {
    const now = new Date();
    const comparisonDate = new Date(compareDate);
    return comparisonDate > now;
  }

  public startEditing(
    rideId: number,
    segmentIndex: number,
    field: 'time' | 'price',
  ) {
    this.editingState[rideId] = {};

    if (!this.editingState[rideId][segmentIndex]) {
      this.editingState[rideId][segmentIndex] = {
        time: false,
        price: false,
      };
    }
    this.editingState[rideId][segmentIndex][field] = true;

    const currentRide = this.ride()?.schedule.find(
      s => s.rideId === rideId,
    );
    if (currentRide) {
      this.tempData[rideId] = {
        segments: currentRide.segments.map(segment => ({
          price: { ...segment.price },
          time: [...segment.time],
        })),
      };
    }
  }

  public cancelEditing(
    rideId: number,
    segmentIndex: number,
    field: 'time' | 'price',
  ) {
    if (
      this.editingState[rideId] &&
      this.editingState[rideId][segmentIndex]
    ) {
      this.editingState[rideId][segmentIndex][field] =
        false;
    }
    if (
      this.tempData[rideId] &&
      this.tempData[rideId].segments
    ) {
      this.tempData[rideId].segments[segmentIndex] =
        JSON.parse(
          JSON.stringify(
            this.ride()?.schedule.find(
              s => s.rideId === rideId,
            )?.segments[segmentIndex],
          ),
        );
    }
  }

  public saveChanges(
    rideId: number,
    segmentIndex: number,
    field: 'time' | 'price',
  ) {
    if (!this.ride() || !this.tempData[rideId]) {
      return;
    }

    const updatedRide: Ride = JSON.parse(
      JSON.stringify(this.ride()),
    );

    const targetRide = updatedRide.schedule.find(
      r => r.rideId === rideId,
    );

    if (targetRide && this.tempData[rideId]?.segments) {
      if (field === 'time') {
        const tempTime =
          this.tempData[rideId].segments[segmentIndex].time;
        if (
          Array.isArray(tempTime) &&
          tempTime.length === 2
        ) {
          targetRide.segments[segmentIndex].time = [
            tempTime[0],
            tempTime[1],
          ];
        } else {
          return;
        }
      } else if (field === 'price') {
        targetRide.segments[segmentIndex].price =
          this.tempData[rideId].segments[
            segmentIndex
          ].price;
      }
    }

    this.rideFacade.updateRide(
      this.id(),
      rideId,
      targetRide!,
    );

    this.editingState[rideId][segmentIndex][field] = false;
  }

  public isEditing(
    rideId: number,
    segmentIndex: number,
    field: 'time' | 'price',
  ): boolean {
    return (
      this.editingState[rideId]?.[segmentIndex]?.[field] ||
      false
    );
  }

  public createRide() {
    this.isCreating.update(value => !value);
  }

  protected deleteRide(event: Event, rideId: number): void {
    event.stopPropagation();

    const data: TuiConfirmData = {
      yes: 'Yes, pls delete it!',
      no: 'No, just go back.',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: `Are you sure you want to delete the Ride ${rideId}?`,
        size: 's',
        data,
      })
      .pipe(
        switchMap(result => {
          if (result) {
            console.log('Processing deletion here');
            console.log(this.id(), rideId);

            this.rideFacade.deleteRide(this.id(), rideId);
          }
          return [];
        }),
      )
      .subscribe();
  }
}
