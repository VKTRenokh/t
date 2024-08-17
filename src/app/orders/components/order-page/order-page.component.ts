import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

@Component({
  selector: 'tra-order-page',
  standalone: true,
  imports: [],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPageComponent {
  private http = inject(HttpClient);

  constructor() {
    this.http.get('/api/order').subscribe(console.log);
  }
}
