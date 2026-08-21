import { Component, inject, input, output, signal } from '@angular/core';
import { QuantitySelectorComponent } from '../quantity-selector-component/quantity-selector-component';
import { ButtonComponent } from "../button-component/button-component";
import { PreferenceComponent } from '../preference-component/preference-component';
import { PreferenceService } from '../../../services/preference-service';
import { QuantityService } from '../../../services/quantity-service';

@Component({
  selector: 'app-generate-step-2-component',
  imports: [QuantitySelectorComponent, ButtonComponent, PreferenceComponent],
  templateUrl: './generate-step-2-component.html',
  styleUrl: './generate-step-2-component.scss',
})
export class GenerateStep2Component {
  readonly preferenceService = inject(PreferenceService);
  readonly quantityService = inject(QuantityService);
  generateRecipeEvent = output<void>();

  onGenerateButtonClick(): void {
    if (this.preferenceService.selectedTimeCharacer() !== null
      && this.preferenceService.selectedCuisineCharacter() !== null
      && this.preferenceService.selectedDietCharacter() !== null) {
      this.generateRecipeEvent.emit();
    } else {
      console.log("Nicht valide");
      
    }



  }
}
