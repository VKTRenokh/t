import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../../models/profile/profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  public profile() {
    return this.http.get<Profile>('/api/profile');
  }

  public updateProfile(profile: Partial<Profile>) {
    return this.http.put<Profile>('/api/profile', profile);
  }

  public updatePassword(password: string) {
    return this.http.put('/api/profile/password', {
      password,
    });
  }
}
