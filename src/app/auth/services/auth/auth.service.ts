import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  public signup(email: string, password: string) {
    return this.http.post('/api/signup', {
      email,
      password,
    });
  }

  public login(email: string, password: string) {
    return this.http.post('/api/signin', {
      email,
      password,
    });
  }
}
