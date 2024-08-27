import {
  createActionGroup,
  props,
  emptyProps,
} from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
import { Profile } from '../../core/models/profile/profile.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    loadProfileSuccess: props<{ user: Profile }>(),

    updateProfile: props<{ user: Partial<Profile> }>(),
    updateProfileSuccess: props<{ user: Profile }>(),

    updatePassword: props<{
      password: string;
    }>(),
    updatePasswordSuccess: emptyProps(),

    failure: props<{ error: ApiError }>(),
    resetError: emptyProps(),
  },
});
