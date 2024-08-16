import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ email: string; password: string }>(),
    loginSuccess: props<{ token: string }>(),
    loginFailure: props<{ error: ApiError }>(),
    registration: props<{
      email: string;
      password: string;
    }>(),
    registrationSuccess: emptyProps(),
    registrationFailure: props<{ error: ApiError }>(),

    resetError: emptyProps(),
  },
});
