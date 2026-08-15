import { Component, signal, computed } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header-component/header-component";
import { UnitComponent } from '../../shared/components/unit-component/unit-component';
import { IngredientForm, UnitVariant } from '../../shared/utils/types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Ingredient } from '../../interfaces/ingredient-interface';


@Component({
  selector: 'app-recipe-generator-page',
  imports: [HeaderComponent, UnitComponent, ReactiveFormsModule],
  templateUrl: './recipe-generator-page.html',
  styleUrl: './recipe-generator-page.scss',
})
export class RecipeGeneratorPage {
  isUnitListOpen = signal<boolean>(false);
  currentUnit = signal<UnitVariant>('gram');

  ingredientForm = new FormGroup<IngredientForm>({
    id: new FormControl(0, { nonNullable: true}),
    name: new FormControl('', {nonNullable: true}),
    unitCount: new FormControl(100, {nonNullable: true}),
    unit: new FormControl('gram', {nonNullable: true})
  });

  ingredients: Ingredient[] = [];

  ingredientCount = computed(() => {
    return this.ingredients.length;
  });

  ingredientsSorted = computed(() => {
    if(this.ingredients.length <= 1) {return this.ingredients;}
    return this.ingredients.sort((a, b) => b.sort_order - a.sort_order);
  });

  onChooseUnit(unit: UnitVariant): void {
    this.currentUnit.set(unit);  
    this.ingredientForm.get('unit')?.setValue(unit);
  }
}
