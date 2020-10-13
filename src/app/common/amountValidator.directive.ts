import { Directive, Input, OnInit } from '@angular/core';

import {
  NG_VALIDATORS,
  AbstractControl,
  FormControl,
  Validator,
  ValidatorFn } from '@angular/forms';

function validateAmount(maxAmount: number): ValidatorFn {
  return (c: AbstractControl) => {
    if (c.value > maxAmount) {
      return { maxValue: true };
    }
    if (c.value < 0) {
      return { minValue: true };
    }
    return null;
  };
}

@Directive({
  // tslint:disable-next-line
  selector: '[maxAmount][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: AmountValidator,
    multi: true
  }],
})

export class AmountValidator implements Validator, OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('maxAmount') maxAmount;
  validator: ValidatorFn;

  validate(c: FormControl): any {
    return this.validator(c);
  }

  ngOnInit(): void {
    this.validator = validateAmount(this.maxAmount);
  }
}
