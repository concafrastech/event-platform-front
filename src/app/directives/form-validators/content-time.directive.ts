import { Directive } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  ValidatorFn,
  Validators,
} from "@angular/forms";

@Directive({
  selector: "[contentTime][ngModel]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: ContentTimeDirective, multi: true },
  ],
})
export class ContentTimeDirective implements Validators {
  validator: ValidatorFn;

  constructor() {
    this.validator = this.timeValidation();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  timeValidation(): ValidatorFn {
    return (time: AbstractControl) => {
      if ((!time.value && time.touched) || time.value <= 0) {
        return {
          time: {
            valid: false,
          },
        };
      }
      return null;
    };
  }
}
