import { UnitVariant } from "./types";

export const UNIT_VARIANTS: UnitVariant[] = ['gram', 'piece', 'ml'];

const LIMITS = {
  gram: { min: 1, max: 5000, integer: false },
  ml: { min: 1, max: 5000, integer: false },
  piece: { min: 1, max: 50, integer: true }
};