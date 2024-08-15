import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // TODO: for testing purpose only
  constructor() {
    this.signup('vitya@email.com', '12345678');
  }

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

  public profile(token: string) {
    return this.http.get<Profile>('/api/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
