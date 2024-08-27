import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Carriage } from '../interfaces/carriages.interface';

@Injectable({
  providedIn: 'root',
})
export class CarriagesService {
  private httpClient = inject(HttpClient);

  public getCarriages() {
    return this.httpClient.get<Carriage[]>('/api/carriage');
  }
}
