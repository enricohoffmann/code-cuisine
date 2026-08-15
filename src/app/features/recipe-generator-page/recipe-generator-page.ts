import { Component, signal, computed } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header-component/header-component";
import { UnitComponent } from '../../shared/components/unit-component/unit-component';
import { IngredientForm, UnitVariant } from '../../shared/utils/types';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ingredient } from '../../interfaces/ingredient-interface';
import { maxWordLengthValidator, noWhitespaceValidator, quantityValidator } from '../../shared/utils/validators';


@Component({
  selector: 'app-recipe-generator-page',
  imports: [HeaderComponent, UnitComponent, ReactiveFormsModule],
  templateUrl: './recipe-generator-page.html',
  styleUrl: './recipe-generator-page.scss',
})
export class RecipeGeneratorPage {
  isUnitListOpen = signal<boolean>(false);
  currentUnit = signal<UnitVariant>('gram');
  isWritingIngredient = signal<boolean>(false);
  isWritingServingSize = signal<boolean>(false);

  ingredientForm = new FormGroup<IngredientForm>({
    id: new FormControl(0, { nonNullable: true}),
    name: new FormControl('', {nonNullable: true, validators : 
      [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50), 
        noWhitespaceValidator(), 
        maxWordLengthValidator(20)
      ]}),
    unitCount: new FormControl(100, {nonNullable: true}),
    unit: new FormControl('gram', {nonNullable: true})
  }, {validators: quantityValidator()});

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

  onInputEnter(fieldName: string): void {
    if(fieldName === 'name') {this.isWritingIngredient.set(true);}
    if(fieldName === 'unitCount') {this.isWritingServingSize.set(true);}
  }

  onInputLeave(fieldName: string): void {
    if(fieldName === 'name') {this.isWritingIngredient.set(false);}
    if(fieldName === 'unitCount') {this.isWritingServingSize.set(false);}
    this.trimFormValues(fieldName);
  }

  trimFormValues(fieldName: string) : void {
    const formControl = this.ingredientForm.get(fieldName);
    if(formControl){
      formControl.setValue(formControl.value!.trim());
    }
  }



}
