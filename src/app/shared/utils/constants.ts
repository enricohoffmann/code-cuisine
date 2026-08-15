import { UnitVariant } from "./types";

export const UNIT_VARIANTS: UnitVariant[] = ['gram', 'piece', 'ml'];

export const LIMITS = {
  gram: { min: 1, max: 5000, integer: false },
  ml: { min: 1, max: 5000, integer: false },
  piece: { min: 1, max: 50, integer: true }
};

export const VALIDATION_MESSAGES = {
    required: () => 'This field is required.',
    minlength: (e: any) => `Minimum ${e.requiredLength} characters required.`,
    maxlength: (e: any) => `Maximum ${e.requiredLength} characters allowed.`,
    whitespace: () => 'This field must not contain only spaces.',
    maxWordLength: (error: { maxLength: number }) => `Words may not contain more than ${error.maxLength} characters.`,
    isNotANumber: () => 'The input must be a number.',
    invalidSize: () => 'The input must be a number.',
    outOfRange: (error: [UnitVariant, number, number]) => `For ${error[0]}, enter a value between ${error[1]} and ${error[2]}.`
}