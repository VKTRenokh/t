import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

import { ApiError } from '../../shared/models/api-error.model';
import { Carriage } from '../../carriages/interfaces/carriages.interface';

export const CarriagesActions = createActionGroup({
  source: 'Carriages',
  events: {
    getCarriages: emptyProps(),
    getCarriagesSuccess: props<{ carriages: Carriage[] }>(),
    createCarriage: props<{ carriage: Carriage }>(),
    createCarriageSuccess: props<{ carriage: Carriage }>(),
    updateCarriage: props<{ carriage: Carriage }>(),
    updateCarriageSuccess: emptyProps(),
    failure: props<{ error: ApiError }>(),
  },
});
