
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

export function nanValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return typeof value === 'number' && Number.isFinite(value) ? null : { isNotANumber: true };
    };
}

export function quantityValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const quantity = group.get('unitCount')?.value;
        const unit = group.get('unit')?.value as UnitVariant;
        const limit = LIMITS[unit];

        if (quantity === null || quantity === undefined || quantity === '') return { invalidSize: true };
        if (!limit) return { invalidUnit: true };
        if (typeof quantity !== 'number' || !Number.isFinite(quantity)) return { invalidSize: true };
        if (!hasValidStep(quantity, limit.step)) return { invalidStep: { step: limit.step } };
        if (!isInRange(quantity, limit.min, limit.max)) return { outOfRange: [unit, limit.min, limit.max] };

        return null;
    };
}

function hasValidStep(quantity: number, step: number): boolean {
    const remainder = quantity / step;
    return Math.abs(remainder - Math.round(remainder)) <= 0.000001;
}

function isInRange(quantity: number, min: number, max: number): boolean {
    return quantity >= min && quantity <= max;
}

