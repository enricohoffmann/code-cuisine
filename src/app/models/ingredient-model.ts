import { Ingredient } from "../interfaces/ingredient-interface";
import { UnitVariant } from "../shared/utils/types";


export class IngredientModel implements Ingredient {
    name: string;
    unitCount: number;
    unit: UnitVariant;
    sort_order: number;

    constructor(ingredientData: Partial<Ingredient> = {}, order: number = 0) {
        this.name = ingredientData.name?.trim() ?? '';
        this.unitCount = ingredientData.unitCount ?? 0;
        this.unit = ingredientData.unit ?? 'gram';
        this.sort_order = order += 1;
    }
}