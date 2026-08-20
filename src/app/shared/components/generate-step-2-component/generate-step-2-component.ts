import { Component, input, output, signal } from '@angular/core';
import { CallToAction } from "../call-to-action/call-to-action";
import { QuantitySelectorComponent } from '../quantity-selector-component/quantity-selector-component';

@Component({
  selector: 'app-generate-step-2-component',
  imports: [QuantitySelectorComponent],
  templateUrl: './generate-step-2-component.html',
  styleUrl: './generate-step-2-component.scss',
})
export class GenerateStep2Component {
  portionsValue = signal<number>(1);
  chefsValue = signal<number>(1);

  addPortion(): void {
    if (this.portionsValue() >= 10) { return; }
    this.portionsValue.update(item => item += 1);
  }

  removePortion(): void {
    if (this.portionsValue() <= 1) { return; }
    this.portionsValue.update(item => item -= 1);
  }
}
