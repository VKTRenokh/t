import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { mockOrderResponse } from '../../models/mock-response';
import { ProfileFacade } from '../../../profile/services/profile-facade.service';
import { Order } from '../../models/orders';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'tra-orders-page',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent {
  private profileFacade = inject(ProfileFacade);

  public profile = this.profileFacade.profile;

  public mockOrder = mockOrderResponse;

  public calculateJourneyDetails(journeyData: Order) {
    const {
      path,
      stationStart,
      stationEnd,
      carriages,
      schedule,
    } = journeyData;

    const startIndex = path.indexOf(stationStart);
    const endIndex = path.indexOf(stationEnd);

    if (startIndex === -1 || endIndex === -1) {
      throw new Error(
        'Start or end station not found in the path',
      );
    }

    const departureTime = new Date(
      schedule.segments[startIndex].time[0],
    );
    const arrivalTime = new Date(
      schedule.segments[endIndex - 1].time[1],
    );

    const totalTimeMs =
      arrivalTime.getTime() - departureTime.getTime();

    const carriageType = carriages[0]; // need to update
    let totalPrice = 0;

    for (let i = startIndex; i < endIndex; i++) {
      totalPrice +=
        schedule.segments[i].price[carriageType] || 0;
    }

    return {
      departureTime,
      arrivalTime,
      totalTimeMs,
      totalPrice,
    };
  }
  //move to utils
  public formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return [hours, minutes, remainingSeconds]
      .map(v => v.toString().padStart(2, '0'))
      .join(':');
  }
}
