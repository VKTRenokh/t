import { AbstractControl } from '@angular/forms';

export const isPasswordsMatch = (
  password: string,
  passwordReapeat: string,
) => {
  return (group: AbstractControl) => {
    const control = group.get(password);
    const matchControl = group.get(passwordReapeat);

    if (!control || !matchControl) {
      return null;
    }
    if (matchControl.errors) {
      return null;
    }

    if (control.value !== matchControl.value) {
      matchControl.setErrors({ mustMatch: true });
    } else {
      matchControl.setErrors(null);
    }
    return null;
  };
};
