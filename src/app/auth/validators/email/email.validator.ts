import { ValidatorFn } from '@angular/forms';

const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{1,}$/;

export const emailValidator: ValidatorFn = control =>
  emailRegex.test(control.value)
    ? null
    : { invalidEmail: { value: control.value } };
