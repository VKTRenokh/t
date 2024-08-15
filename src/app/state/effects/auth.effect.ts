import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { AuthService } from '../../auth/services/auth/auth.service';
import { AuthActions } from '../actions/auth.action';
import { exhaustMap, map, tap } from 'rxjs';
import { StorageService } from '../../core/services/storage/storage.service';
import { tokenKey } from '../../shared/constants/token-key.constant';

@Injectable()
export class AuthEffects {
  private actions = inject(Actions);
  private authService = inject(AuthService);
  private storageService = inject(StorageService);

  private saveToken(token: string) {
    this.storageService.set(tokenKey, token);
  }

  public loginEffect = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.login),
      exhaustMap(data =>
        this.authService
          .login(data.email, data.password)
          .pipe(
            tap(response => {
              this.saveToken(response.token);
            }),
            map(response =>
              AuthActions.loginSuccess(response),
            ),
          ),
      ),
    ),
  );
}
