import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchActions } from '../../../state/actions/search.action';
import { LatLngStringTuple } from '../search/search.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectData,
  selectError,
} from '../../../state/selectors/search.selector';

@Injectable({
  providedIn: 'root',
})
export class SearchFacadeService {
  private store = inject(Store);

  public data = toSignal(this.store.select(selectData));
  public error = toSignal(this.store.select(selectError));

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
