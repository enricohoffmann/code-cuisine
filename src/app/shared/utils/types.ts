import { FormControl } from "@angular/forms";

export type ColorVariant = 'white' | 'colored';
export type CTAVariant = 'forward' | 'backward';
export type UnitVariant = 'gram' | 'piece' | 'ml';

export type IngredientForm = {
    id: FormControl<number>;
    name: FormControl<string>;
    unitCount: FormControl<number>;
    unit: FormControl<UnitVariant>;
}

