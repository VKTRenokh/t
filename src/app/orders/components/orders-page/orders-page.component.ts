import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

@Component({
  selector: 'tra-orders-page',
  standalone: true,
  imports: [],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent {
  private http = inject(HttpClient);

  public test() {
    this.http.get('/api/order').subscribe({
      next: response => {
        console.log('API Response:', response);
      },
      error: error => {
        console.error('API Error:', error);
      },
    });
  }
}
