
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { UnitVariant } from "./types";
import { LIMITS } from "./constants";

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
        return value > maxValue ? { tooBig: true } : null;
    };
}

export function minUnitCountValidator(minValue: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return value < minValue ? { toSmall: true } : null;
    };
}

export function nanValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return Number.isNaN(value) ? { isNotANumber: true } : null;
    };
}

export function quantityValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const quantity = group.get('unitCount')?.value;
        const unit = group.get('unit')?.value as UnitVariant;
        const currentLimit = LIMITS[unit];

        if (quantity === null || quantity === undefined || quantity === '') { return { invalidSize: true }; }

        if(!currentLimit) { return { invalidUnit: true };}

        if (typeof quantity !== 'number' || !Number.isFinite(quantity)) { return { invalidSize: true }; }

        if (quantity < currentLimit.min || quantity > currentLimit.max) { return { outOfRange: true }; }

        return null;
    };
}

