import { Component, input, signal, output } from '@angular/core';
import { Preference, Characteristic } from '../../../interfaces/preference-interface';
import { ButtonComponent } from '../button-component/button-component';

@Component({
  selector: 'app-preference-component',
  imports: [ButtonComponent],
  templateUrl: './preference-component.html',
  styleUrl: './preference-component.scss',
})
export class PreferenceComponent {
  preference = input.required<Preference>();
  selectedCharacteristic = signal<Characteristic | null>(null);
  changeSelection = output<number>();

  onSelectionClick(characteristicId: number): void {
    this.changeSelection.emit(characteristicId);
  }
}
