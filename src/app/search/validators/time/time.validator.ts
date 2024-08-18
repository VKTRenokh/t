import { ValidatorFn } from '@angular/forms';
import { isNotNullable } from '../../../shared/utils/is-not-nullables';

export const timeValidator: ValidatorFn = control =>
  isNotNullable(control.value[1])
    ? null
    : { time: { value: control.value } };
