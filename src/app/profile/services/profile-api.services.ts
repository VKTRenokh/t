import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  private http = inject(HttpClient);

  public getProfile() {
    console.log('i call get profile');
    return this.http.get<Profile>('/api/profile').pipe(
      catchError(error => {
        if (error.status === 401) {
          return throwError(() => ({
            error: {
              message: 'Access is not granted',
              reason: 'invalidAccessToken',
            },
          }));
        }
        return throwError(() => error);
      }),
    );
  }

  public updateProfile(profile: Partial<Profile>) {
    return this.http
      .put<Profile>('/api/profile', profile)
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            return throwError(() => ({
              error: {
                message: 'Access is not granted',
                reason: 'invalidAccessToken',
              },
            }));
          }
          if (error.status === 400) {
            return throwError(() => ({
              error: {
                message: 'Email already exists',
                reason: 'invalidUniqueKey',
              },
            }));
          }
          return throwError(() => error);
        }),
      );
  }

  public updatePassword(password: string) {
    return this.http
      .put('/api/profile/password', { password })
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            return throwError(() => ({
              error: {
                message: 'Access is not granted',
                reason: 'invalidAccessToken',
              },
            }));
          }
          if (error.status === 400) {
            return throwError(() => ({
              error: {
                message: 'Password is wrong',
                reason: 'invalidPassword',
              },
            }));
          }
          return throwError(() => error);
        }),
      );
  }
}
