import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiAccordion } from '@taiga-ui/kit';
import { RideFacadeService } from '../../services/ride/ride-facade.service';
import { TuiInputNumberModule } from '@taiga-ui/legacy';
import { FormsModule } from '@angular/forms';
import { Ride } from '../../models/ride/ride.model';
import { RideComponent } from '../ride/ride.component';

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
  ],
  templateUrl: './ride-page.component.html',
  styleUrl: './ride-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class RidePageComponent implements OnInit {
  public id = input.required<string>();

  private datePipe = inject(DatePipe);
  private rideFacade = inject(RideFacadeService);

  public ride = this.rideFacade.ride;
  public listOfStations = computed(() => {
    const route = this.ride();
    return route ? route.path : [];
  });

  public editingState: Record<
    number,
    Record<number, EditingState>
  > = {};
  public tempData: TempRideData = {};

  public formatDate(date: string): string {
    return this.datePipe.transform(date, 'medium') || '';
  }

  public ngOnInit() {
    this.rideFacade.getRide(this.id()!);
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
    console.log('create');
  }
}
