import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { mockOrderResponse } from '../../models/mock-response';
import { ProfileFacade } from '../../../profile/services/profile-facade.service';

@Component({
  selector: 'tra-orders-page',
  standalone: true,
  imports: [],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent {
  private profileFacade = inject(ProfileFacade);

  public profile = this.profileFacade.profile;

  private http = inject(HttpClient);
  public mockOrder = mockOrderResponse;
  public test() {
    console.log(this.profile());
    console.log(this.mockOrder);

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
}
