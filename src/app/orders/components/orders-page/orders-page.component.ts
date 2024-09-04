import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { mockOrderResponse } from '../../models/mock-response';
import { ProfileFacade } from '../../../profile/services/profile-facade.service';
import { Order } from '../../models/orders';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CarriagesFacade } from '../../../state/facades/carriages.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { TUI_CONFIRM, TuiConfirmData } from '@taiga-ui/kit';
import { switchMap } from 'rxjs';
import {
  TuiButton,
  TuiDialogService,
} from '@taiga-ui/core';
import { Roles } from '../../../core/enums/role/role.enum';
import { OrdersFacadeService } from '../../services/orders-facade.service';

@Component({
  selector: 'tra-orders-page',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, TuiButton],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent {
  private profileFacade = inject(ProfileFacade);
  private ordersFacade = inject(OrdersFacadeService);
  private carriagesFacade = inject(CarriagesFacade);

  public profile = this.profileFacade.profile;
  public carriages = toSignal(
    this.carriagesFacade.carriages,
  );

  public isAdmin: Signal<boolean> = computed(
    () => this.profileFacade.userRole() === Roles.Manager,
  );

  private readonly dialogs = inject(TuiDialogService);

  private http = inject(HttpClient);
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
  public formatDuration(ms: number) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor(
      (ms % (1000 * 60 * 60)) / (1000 * 60),
    );

    if (hours === 0) {
      return `${minutes}m`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }

  public needtoremove() {
    this.carriagesFacade.getCarriages();
    console.log(this.profile());
    console.log(this.mockOrder);
    console.log(this.carriages());

    this.http.get('/api/order').subscribe({
      next: response => {
        console.log('API Response:', response);
      },
      error: error => {
        console.error('API Error:', error);
      },
    });

    this.http.get('/api/users').subscribe({
      next: response => {
        console.log('API Response:', response);
      },
      error: error => {
        console.error('API Error:', error);
      },
    });
  }

  protected deleteOrder(
    event: Event,
    orderId: number,
    userId: number,
  ): void {
    event.stopPropagation();

    const data: TuiConfirmData = {
      yes: 'Yes, pls delete it!',
      no: 'No, just go back.',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: `Are you sure you want to delete the Order № - ${orderId} of User - ${userId}?`,
        size: 's',
        data,
      })
      .pipe(
        switchMap(result => {
          if (result) {
            console.log('Processing deletion here');
            this.ordersFacade.deleteOrder(orderId);
          }
          return [];
        }),
      )
      .subscribe();
  }
}
