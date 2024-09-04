import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/orders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private http = inject(HttpClient);

  // TBD Request (application/json)
  // Attributes: (object)
  // all: true (boolean, optional) - allows manager to retrieve all orders
  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/order');
  }

  public getUsers() {
    return this.http.get('/api/usersr');
  }

  public deleteOrder(orderId: number) {
    return this.http.delete(`/api/order/${orderId}`);
  }
}
