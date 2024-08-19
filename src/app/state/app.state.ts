import { AuthState } from './reducers/auth.reducer';
import { UserState } from './reducers/user.reducer';

export interface AppState {
  auth: AuthState;
  user: UserState;
}
