import { Injectable, computed, signal } from '@angular/core';
import { IngredientModel } from '../models/ingredient-model';
import { FormGroup } from '@angular/forms';
import { IngredientForm } from '../shared/utils/types';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {

  ingredients = signal<IngredientModel[]>([]);

  ingredientsSorted = computed(() => {
    if (this.ingredients().length <= 1) { return this.ingredients(); }
    return [...this.ingredients()].sort((a, b) => b.sort_order - a.sort_order);
  });

  addIngredientToList(ingredientForm: FormGroup<IngredientForm> ): void {
    const newIngredient = new IngredientModel(ingredientForm.value, this.ingredients().length);
    this.ingredients.update(items => [...items, newIngredient]);
  }

  toggleIngredientEditMode(selectedIngredient: IngredientModel, editMode: boolean): void {
    this.ingredients.update(items =>
      items.map(item =>
        item.id === selectedIngredient.id ? { ...item, editMode: editMode } : item
      )
    );
  }

  removeOneIngredient(index: number): void {
    const selectedIngredient = this.ingredientsSorted().at(index);
    if (!selectedIngredient) { return; }
    this.ingredients.update(items => items.filter(item => item.id !== selectedIngredient.id));
  }

}
