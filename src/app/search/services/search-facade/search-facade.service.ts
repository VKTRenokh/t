import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchActions } from '../../../state/actions/search.action';
import { LatLngStringTuple } from '../search/search.service';

@Injectable({
  providedIn: 'root',
})
export class SearchFacadeService {
  private store = inject(Store);

  public search(
    from: LatLngStringTuple,
    to: LatLngStringTuple,
    time: number,
  ) {
    this.store.dispatch(
      SearchActions.search({ from, to, time }),
    );
  }
}
