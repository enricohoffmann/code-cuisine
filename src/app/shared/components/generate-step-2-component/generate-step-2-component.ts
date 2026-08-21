import { Component, inject, input, output, signal } from '@angular/core';
import { CallToAction } from "../call-to-action/call-to-action";
import { QuantitySelectorComponent } from '../quantity-selector-component/quantity-selector-component';
import { ButtonComponent } from "../button-component/button-component";
import { PreferenceComponent } from '../preference-component/preference-component';
import { Preference } from '../../../interfaces/preference-interface';
import { PreferenceService } from '../../../services/preference-service';

@Component({
  selector: 'app-generate-step-2-component',
  imports: [QuantitySelectorComponent, ButtonComponent, PreferenceComponent],
  templateUrl: './generate-step-2-component.html',
  styleUrl: './generate-step-2-component.scss',
})
export class GenerateStep2Component {
  portionsValue = signal<number>(1);
  chefsValue = signal<number>(1);
  readonly preferenceService = inject(PreferenceService);

  addPortion(): void {
    if (this.portionsValue() >= 10) { return; }
    this.portionsValue.update(portion => portion += 1);
  }

  removePortion(): void {
    if (this.portionsValue() <= 1) { return; }
    this.portionsValue.update(portion => portion -= 1);
  }

  addChef(): void {
    if (this.chefsValue() >= 10) { return; }
    this.chefsValue.update(chef => chef += 1);
  }

  removeChef(): void {
    if (this.chefsValue() <= 1) { return; }
    this.chefsValue.update(chef => chef = - 1);
  }

  
}
