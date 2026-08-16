import { UnitVariant } from "../shared/utils/types";

export interface Ingredient {
    name: string;
    unitCount: number;
    unit: UnitVariant;
    sort_order: number;
}