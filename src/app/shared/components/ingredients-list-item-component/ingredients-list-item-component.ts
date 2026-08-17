import { Component, input, OnInit, signal, output, computed } from '@angular/core';
import { IngredientModel } from '../../../models/ingredient-model';
import { UnitComponent } from '../unit-component/unit-component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IngredientForm, UnitVariant } from '../../utils/types';
import { nanValidator, quantityValidator } from '../../utils/validators';
import { VALIDATION_MESSAGES } from '../../utils/constants';

@Component({
  selector: 'app-ingredients-list-item-component',
  imports: [UnitComponent, ReactiveFormsModule],
  templateUrl: './ingredients-list-item-component.html',
  styleUrl: './ingredients-list-item-component.scss',
})
export class IngredientsListItemComponent implements OnInit {
  ingredient = input.required<IngredientModel>();
  ingredientIndex = input.required<number>();
  isUnitListOpen = signal<boolean>(false);

  isEditMode = computed(() => {
    return this.ingredient().editMode;
  });

  startEditMode = output<number>();
  endEditMode = output<number>();
  currentUnit = signal<UnitVariant>('gram');
  isWriting = signal<boolean>(false);

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
    this.currentUnit.set(this.ingredient().unit);
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

  onSaveClick(): void {
    this.ingredientForm.markAllAsTouched();
    if(this.ingredientForm.valid){
      this.endEditMode.emit(this.ingredientIndex());
      this.isUnitListOpen.set(false);
    }
  }

  onInputEnter(): void {
    this.isWriting.set(true);
  }

  onInputLeave(): void {
    this.isWriting.set(false);  
  }

  onChooseUnit(unit: UnitVariant): void {
    this.currentUnit.set(unit);
    this.ingredientForm.get('unit')?.setValue(unit);
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

}
