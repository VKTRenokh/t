import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private url = '/api/order/';

  private httpClient = inject(HttpClient);

  public getOrders() {
    return this.httpClient.get(this.url);
  }
}
