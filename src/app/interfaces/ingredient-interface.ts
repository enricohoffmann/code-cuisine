import { UnitVariant } from "../shared/utils/types";

export interface Ingredient {
    id: number;
    name: string;
    unitCount: number;
    unit: UnitVariant;
    sort_order: number;
}