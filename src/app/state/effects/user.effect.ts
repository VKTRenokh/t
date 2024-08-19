import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { UserService } from '../../core/services/user/user.service';

@Injectable()
export class UserEffects {
  private actions = inject(Actions);
  private userService = inject(UserService);
}
