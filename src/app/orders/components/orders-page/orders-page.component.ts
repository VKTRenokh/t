import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { mockOrderResponse } from '../../models/mock-response';
import { ProfileFacade } from '../../../profile/services/profile-facade.service';
import { Order } from '../../models/orders';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tra-orders-page',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent {
  private profileFacade = inject(ProfileFacade);

  public profile = this.profileFacade.profile;

  private http = inject(HttpClient);
  public mockOrder = mockOrderResponse;

  public getDepartureTime(journeyData: Order) {
    const { path, stationStart, schedule } = journeyData;
    const startIndex = path.indexOf(stationStart);
    return new Date(schedule.segments[startIndex].time[0]);
  }

  public getArrivalsTime(journeyData: Order) {
    const { path, stationEnd, schedule } = journeyData;
    const endIndex = path.indexOf(stationEnd);
    return new Date(
      schedule.segments[endIndex - 1].time[1],
    );
  }
}
