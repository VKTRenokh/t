import { createActionGroup, props } from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
import { Profile } from '../../core/models/profile/profile.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    loadProfileSuccess: props<{ user: Profile }>(),
    loadProfileFailure: props<{ error: ApiError }>(),
  },
});
