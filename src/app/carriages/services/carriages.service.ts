import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import {
  Carriage,
  CarriageObject,
} from '../interfaces/carriages.interface';

@Injectable({
  providedIn: 'root',
})
export class CarriagesService {
  private url = '/api/carriage/';

  private httpClient = inject(HttpClient);

  public getCarriages() {
    return this.httpClient.get<Carriage[]>(this.url);
  }

  public createCarriage(carriage: CarriageObject) {
    return this.httpClient.post<string>(this.url, carriage);
  }

  public updateCarriage(carriage: Carriage) {
    console.log(carriage.code);
    const newCarriage = {
      name: carriage.name,
      rows: carriage.rows,
      leftSeats: carriage.leftSeats,
      rightSeats: carriage.rightSeats,
    };

    return this.httpClient.put<string>(
      `${this.url}${carriage.code}`,
      newCarriage,
    );
  }
}
