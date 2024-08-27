import { AuthState } from './reducers/auth.reducer';
import { ProfileState } from './reducers/profile.reducer';
import { StationsState } from './reducers/stations.reducer';

export interface AppState {
  auth: AuthState;
  stations: StationsState;
  profile: ProfileState;
}
