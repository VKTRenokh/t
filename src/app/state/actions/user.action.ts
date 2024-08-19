import { createActionGroup, props } from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    loadProfileSuccess: props<{ user: null }>(),
    loadProfileFailure: props<{ error: ApiError }>(),
  },
});
