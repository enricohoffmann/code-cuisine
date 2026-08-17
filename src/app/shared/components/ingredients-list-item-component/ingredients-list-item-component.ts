import { Component, input, OnInit, signal, output, computed } from '@angular/core';
import { IngredientModel } from '../../../models/ingredient-model';
import { UnitComponent } from '../unit-component/unit-component';
import { FormControl, FormGroup } from '@angular/forms';
import { IngredientForm, UnitVariant } from '../../utils/types';
import { nanValidator, quantityValidator } from '../../utils/validators';

@Component({
  selector: 'app-ingredients-list-item-component',
  imports: [UnitComponent],
  templateUrl: './ingredients-list-item-component.html',
  styleUrl: './ingredients-list-item-component.scss',
})
export class IngredientsListItemComponent implements OnInit {
  ingredient = input.required<IngredientModel>();
  ingredientIndex = input.required<number>();

  isEditMode = computed(() => {
    console.log(this.ingredient());
    
    return this.ingredient().editMode;
  });

  startEditMode = output<number>();

  private readonly UNIT_STRINGS: Record<UnitVariant, string> = {
    gram: 'g',
    ml: 'ml',
    piece: ''
  };

  ingredientForm = new FormGroup<IngredientForm>({
    name: new FormControl('', { nonNullable: true }),
    unitCount: new FormControl(100, { nonNullable: true, validators: [nanValidator()] }),
    unit: new FormControl('gram', { nonNullable: true })
  }, {validators: quantityValidator()});


  ngOnInit(): void {
    this.ingredientForm.controls.name.setValue(this.ingredient().name);
    this.ingredientForm.controls.unit.setValue(this.ingredient().unit);
    this.ingredientForm.controls.unitCount.setValue(this.ingredient().unitCount);
  }

  get ingredientName(): string {
    return this.ingredientForm.controls.name.value;
  }

  get unitCountWithUnit(): string {
    return `${this.ingredientForm.controls.unitCount.value}${this.UNIT_STRINGS[this.ingredientForm.controls.unit.value]}`;
  }

  onEditClick(): void {
    this.startEditMode.emit(this.ingredientIndex());
  }

}
