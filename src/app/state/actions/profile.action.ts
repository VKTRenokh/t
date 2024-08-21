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
    'Fetch Profile': emptyProps(),
    'Fetch Profile Success': props<{ profile: Profile }>(),
    'Fetch Profile Failure': props<{ error: ApiError }>(),

    'Update Profile': props<{
      profile: Partial<Profile>;
    }>(),
    'Update Profile Success': props<{ profile: Profile }>(),
    'Update Profile Failure': props<{ error: ApiError }>(),

    'Update Password': props<{ password: string }>(),
    'Update Password Success': emptyProps(),
    'Update Password Failure': props<{ error: ApiError }>(),
  },
});
