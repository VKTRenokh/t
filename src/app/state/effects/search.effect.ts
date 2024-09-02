import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { SearchService } from '../../search/services/search/search.service';
import { SearchActions } from '../actions/search.action';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class SearchEffects {
  private actions = inject(Actions);
  private searchService = inject(SearchService);

  public searchEffect = createEffect(() =>
    this.actions.pipe(
      ofType(SearchActions.search),
      exhaustMap(info =>
        this.searchService
          .search(info.from, info.to, info.time)
          .pipe(
            map(data =>
              SearchActions.searchSuccess({ data }),
            ),
          ),
      ),
    ),
  );
}
