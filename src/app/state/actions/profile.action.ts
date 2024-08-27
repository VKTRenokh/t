import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
import { Profile } from '../../profile/models/profile.model';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    fetchProfile: emptyProps(),
    fetchProfileSuccess: props<{ profile: Profile }>(),

    updateProfile: props<{ profile: Partial<Profile> }>(),
    updateProfileSuccess: props<{ profile: Profile }>(),

    updatePassword: props<{
      password: string;
    }>(),
    updatePasswordSuccess: emptyProps(),

    profileFailure: props<{ error: ApiError }>(),
    resetError: emptyProps(),
  },
});
