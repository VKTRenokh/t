import { AbstractControl } from '@angular/forms';

const isFuture = (date: Date) =>
  date.getTime() > Date.now();

export const futureDateValidator = (
  control: AbstractControl,
) =>
  isFuture(new Date(control.value))
    ? { futureDate: { value: control.value } }
    : null;
