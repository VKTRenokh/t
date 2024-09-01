import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'tra-order-page',
  standalone: true,
  imports: [],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPageComponent implements OnInit {
  private service = inject(OrdersService);
  public ngOnInit(): void {
    this.service
      .getOrders()
      .subscribe(orders => console.log(orders));
  }
}
