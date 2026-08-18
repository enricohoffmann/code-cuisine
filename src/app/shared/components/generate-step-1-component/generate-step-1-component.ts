import { Component, signal, computed, inject, output } from '@angular/core';
import { IngredientService } from '../../../services/ingredient-service';
import { IngredientForm, UnitVariant } from '../../utils/types';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noWhitespaceValidator, maxWordLengthValidator, nanValidator, quantityValidator } from '../../utils/validators';
import { DialogOverlayService } from '../../../services/dialog-overlay-service';
import { VALIDATION_MESSAGES } from '../../utils/constants';
import { UnitComponent } from '../unit-component/unit-component';
import { IngredientsListItemComponent } from '../ingredients-list-item-component/ingredients-list-item-component';
import { ButtonComponent } from '../button-component/button-component';

@Component({
  selector: 'app-generate-step-1-component',
  imports: [ReactiveFormsModule, UnitComponent, IngredientsListItemComponent, ButtonComponent],
  templateUrl: './generate-step-1-component.html',
  styleUrl: './generate-step-1-component.scss',
})
export class GenerateStep1Component {
  readonly ingredientService = inject(IngredientService);
  isUnitListOpen = signal<boolean>(false);
  currentUnit = signal<UnitVariant>('gram');
  isWritingIngredient = signal<boolean>(false);
  isWritingServingSize = signal<boolean>(false);
  currentIngredientInEdit = signal<number | null>(null);
  isSubmitted = signal<boolean>(false);
  private readonly dialogOverlayService = inject(DialogOverlayService);
  nextStepEvent = output<void>();

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
    }
  }

  addIngredientToList(): void {
    this.ingredientService.addIngredientToList(this.ingredientForm);
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

  ingredientWantsToEdit(index: number): void {
    if (this.currentIngredientInEdit() == null || this.currentIngredientInEdit() === index) {
      const selectedIngredient = this.ingredientService.ingredientsSorted().at(index);
      if (!selectedIngredient) { return; }
      this.ingredientService.toggleIngredientEditMode(selectedIngredient, true);
      this.currentIngredientInEdit.set(index);
    } else {
      this.showPopupDialog("That won't work like that.", 
        "Only one ingredient can be processed at a time. Please complete the current operation first."
      );
    }
  }

  ingredientEndsEdit(index: number): void {
    const selectedIngredient = this.ingredientService.ingredientsSorted().at(index);
    if (!selectedIngredient) { return; }
    this.ingredientService.toggleIngredientEditMode(selectedIngredient, false);
    this.currentIngredientInEdit.set(null);
  }

  showPopupDialog(title: string, message: string): void {
    this.dialogOverlayService.openNoticeDialog(title, message).subscribe(() => this.hidePopupDialog());
  }

  hidePopupDialog(): void {
    this.dialogOverlayService.close();
  }

  onNextStep(): void {
    if (this.currentIngredientInEdit() != null) {
      this.showPopupDialog(
        'That won\'t work like that.', 'Please finish editing the ingredient before moving to the next step.');
    } else {
      this.nextStepEvent.emit();
    }
  }
}
