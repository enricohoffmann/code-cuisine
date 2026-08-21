import { Component, inject, input, output, signal } from '@angular/core';
import { QuantitySelectorComponent } from '../quantity-selector-component/quantity-selector-component';
import { ButtonComponent } from "../button-component/button-component";
import { PreferenceComponent } from '../preference-component/preference-component';
import { PreferenceService } from '../../../services/preference-service';
import { QuantityService } from '../../../services/quantity-service';
import { DialogOverlayService } from '../../../services/dialog-overlay-service';

@Component({
  selector: 'app-generate-step-2-component',
  imports: [QuantitySelectorComponent, ButtonComponent, PreferenceComponent],
  templateUrl: './generate-step-2-component.html',
  styleUrl: './generate-step-2-component.scss',
})
export class GenerateStep2Component {
  readonly preferenceService = inject(PreferenceService);
  readonly quantityService = inject(QuantityService);
  private readonly dialogOverlayService = inject(DialogOverlayService);
  generateRecipeEvent = output<void>();

  onGenerateButtonClick(): void {
    if (this.preferenceService.selectedTimeCharacer() !== null
      && this.preferenceService.selectedCuisineCharacter() !== null
      && this.preferenceService.selectedDietCharacter() !== null) {
      this.generateRecipeEvent.emit();
    } else {
      this.showPopupDialog("That won't work like that.", "Select one option each for cooking time, cuisine, and diet.");
    }

  }

  showPopupDialog(title: string, message: string): void {
    this.dialogOverlayService.openNoticeDialog(title, message).subscribe(() => this.hidePopupDialog());
  }

  hidePopupDialog(): void {
    this.dialogOverlayService.close();
  }
}
