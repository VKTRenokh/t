import { AuthState } from './reducers/auth.reducer';
import { CarriagesState } from './reducers/carriages.reducer';
import { RoutesState } from './reducers/routes.reducer';
import { SearchState } from './reducers/search.reducer';
import { StationsState } from './reducers/stations.reducer';
import { UserState } from './reducers/user.reducer';

export interface AppState {
  auth: AuthState;
  stations: StationsState;
  user: UserState;
  carriages: CarriagesState;
  routes: RoutesState;
  search: SearchState;
}
