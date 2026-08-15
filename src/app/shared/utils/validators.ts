
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (typeof value !== 'string') {
            return null;
        }

        if (value.length === 0) {
            return null;
        }

        return value.trim().length === 0 ? { whitespace: true } : null;
    };
}

export function maxWordLengthValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string' || value.trim() === '') {
      return null;
    }

    const hasTooLongWord = value
      .trim()
      .split(/\s+/)
      .some(word => word.length > maxLength);

    return hasTooLongWord
      ? { maxWordLength: { maxLength } }
      : null;
  };
}

export function maxUnitCountValidator(maxValue: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return  value > maxValue ? { tooBig: true } : null;
    };
}

export function minUnitCountValidator(minValue: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return value < minValue ? { toSmall: true} : null;
    };
}

