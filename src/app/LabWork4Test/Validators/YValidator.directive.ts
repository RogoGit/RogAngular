import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';
import { YValidator} from './YValidator';

@Directive({
  selector: '[appYvalid]',
  providers: [{ provide: NG_VALIDATORS, useExisting: YValidatorDirective, multi: true }]
})

export class YValidatorDirective implements Validator {

  private valFn = YValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}
