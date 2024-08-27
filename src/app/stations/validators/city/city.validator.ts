import { ValidatorFn } from '@angular/forms';
import { Signal } from '@angular/core';

export const cityValidator =
  (
    citiesSignal: Signal<string[] | undefined>,
  ): ValidatorFn =>
  control => {
    const cities = citiesSignal();

    if (!control.value) {
      return null;
    }

    return cities && cities.includes(control.value)
      ? null
      : { city: { value: control.value } };
  };
