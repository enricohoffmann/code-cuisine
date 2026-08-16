import { Component, signal, computed } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header-component/header-component";
import { UnitComponent } from '../../shared/components/unit-component/unit-component';
import { IngredientForm, UnitVariant } from '../../shared/utils/types';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ingredient } from '../../interfaces/ingredient-interface';
import { maxWordLengthValidator, nanValidator, noWhitespaceValidator, quantityValidator } from '../../shared/utils/validators';
import { VALIDATION_MESSAGES } from '../../shared/utils/constants';
import { IngredientModel } from '../../models/ingredient-model';


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
    name: new FormControl('', {
      nonNullable: true, validators:
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          noWhitespaceValidator(),
          maxWordLengthValidator(20)
        ]
    }),
    unitCount: new FormControl(100, { nonNullable: true, validators: [nanValidator()] }),
    unit: new FormControl('gram', { nonNullable: true })
  }, { validators: quantityValidator() });

  ingredients: IngredientModel[] = [];

  ingredientsSorted = computed(() => {
    if (this.ingredients.length <= 1) { return this.ingredients; }
    return this.ingredients.sort((a, b) => b.sort_order - a.sort_order);
  });

  isSubmitted = signal<boolean>(false);

  onChooseUnit(unit: UnitVariant): void {
    this.currentUnit.set(unit);
    this.ingredientForm.get('unit')?.setValue(unit);
  }

  onInputEnter(fieldName: string): void {
    if (fieldName === 'name') { this.isWritingIngredient.set(true); }
    if (fieldName === 'unitCount') { this.isWritingServingSize.set(true); }
  }

  onInputLeave(fieldName: string): void {
    if (fieldName === 'name') { 
      this.isWritingIngredient.set(false); 
      this.trimFormValues(fieldName);
    }

    if (fieldName === 'unitCount') { this.isWritingServingSize.set(false); }
    
  }

  trimFormValues(fieldName: string): void {
    const formControl = this.ingredientForm.get(fieldName);
    if (formControl) {
      formControl.setValue(formControl.value!.trim());
    }
  }

  getErrorMessage(control: AbstractControl | null): string | null {
    if (control == null) { return null; }
    if (!control.errors) { return null; }
    if (control.untouched && control.invalid) { return null; }

    const firstErrorKey = Object.keys(control.errors)[0];
    const errorMessageFactory = VALIDATION_MESSAGES[firstErrorKey as keyof typeof VALIDATION_MESSAGES];
    if (!errorMessageFactory) { return 'Unknown validation error.'; }

    return errorMessageFactory(control.errors[firstErrorKey]);
  }

  onSubmit(): void {
    this.ingredientForm.markAllAsTouched();
    if (this.ingredientForm.valid) {
      this.trimFormValues('name');
      this.isSubmitted.set(true);
      this.addIngredientToList();
      this.resetIngredientForm();
      console.log(this.ingredients);
      
    }
  }

  addIngredientToList(): void {
    const ingredient = new IngredientModel(this.ingredientForm.value, this.ingredients.length);
    this.ingredients.push(ingredient);
  }

  resetIngredientForm(): void {
    this.resetIngredientNameControl();
    this.resetUnitCountControl();
    this.resetUnitControl();
    this.isSubmitted.set(false);
  }

  resetIngredientNameControl(): void {
    const control = this.ingredientForm.controls.name;
    control.setValue('');
    control.markAsUntouched();
    control.markAsPristine();
  }

  resetUnitCountControl(): void {
    const control = this.ingredientForm.controls.unitCount;
    control.setValue(100);
    control.markAsUntouched();
    control.markAsPristine();
  }

  resetUnitControl(): void {
    const control = this.ingredientForm.controls.unit;
    this.currentUnit.set('gram');
    control.setValue('gram');
    control.markAsUntouched();
    control.markAsPristine();
  }

  preventEnterSubmit(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const target = keyboardEvent.target;

    if (target instanceof HTMLTextAreaElement) { return; }

    if (target instanceof HTMLInputElement) {
      keyboardEvent.preventDefault();
    }
  }

}
