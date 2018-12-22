import { AbstractControl, ValidatorFn } from '@angular/forms';

export function YValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {

    let isOk = true;
    if (control.value > 5 || control.value < -5) { isOk = false; }
    return isOk ? null : { 'YK': 'Значение должно быть от -5 до 5' };
  };
}
