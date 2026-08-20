import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector-component',
  imports: [],
  templateUrl: './quantity-selector-component.html',
  styleUrl: './quantity-selector-component.scss',
})
export class QuantitySelectorComponent {
  quantityType = input.required<string>();
  quantityValue = input.required<number>();
  quantityAdd = output<void>();
  quantityRemove = output<void>();

  onQuantityAdd(): void {
    this.quantityAdd.emit();
  }

  onQuantityRemove(): void {
    if (this.quantityValue() <= 1) { return; }
    this.quantityRemove.emit();
  }
}
