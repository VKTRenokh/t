import { AuthState } from './reducers/auth.reducer';
import { ProfileState } from './reducers/profile.reducer';

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
}
