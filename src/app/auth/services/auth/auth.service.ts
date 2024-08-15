import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { Login } from '../../models/login.model';

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
    return this.http.post<Login>('/api/signin', {
      email,
      password,
    });
  }

  public profile() {
    return this.http.get<Profile>('/api/profile');
  }
}
