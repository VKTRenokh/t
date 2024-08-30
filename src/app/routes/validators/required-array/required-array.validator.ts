import { ValidatorFn } from '@angular/forms';

const isNonNullableArray = (value: unknown) =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(Boolean);

export const requiredArray: ValidatorFn = control =>
  isNonNullableArray(control.value)
    ? null
    : { requiredArray: { value: control.value } };
