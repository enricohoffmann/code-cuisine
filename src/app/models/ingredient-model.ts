import { Ingredient } from "../interfaces/ingredient-interface";
import { UnitVariant } from "../shared/utils/types";


export class IngredientModel implements Ingredient {
    id: number;
    name: string;
    unitCount: number;
    unit: UnitVariant;
    sort_order: number;
    editMode: boolean;

    constructor(ingredientData: Partial<Ingredient> = {}, listLenght: number = 0) {
        this.id = listLenght += 1;
        this.name = ingredientData.name?.trim() ?? '';
        this.unitCount = ingredientData.unitCount ?? 0;
        this.unit = ingredientData.unit ?? 'gram';
        this.sort_order = listLenght += 1;
        this.editMode = false;
    }
}