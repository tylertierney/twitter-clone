import { AbstractControl, ValidatorFn } from '@angular/forms';

export const usernameTextValidator: ValidatorFn = (
  control: AbstractControl
) => {
  if (!control.value.length) return null;

  const regex = /^[a-zA-Z0-9_]+$/;

  if (!regex.test(control.value)) {
    return {
      alphanumericText: true,
    };
  }
  return null;
};
