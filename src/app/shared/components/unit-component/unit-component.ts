import { Component, input, output } from '@angular/core';
import {UNIT_VARIANTS} from '../../utils/constants';
import { UnitVariant } from '../../utils/types';

@Component({
  selector: 'app-unit-component',
  imports: [],
  templateUrl: './unit-component.html',
  styleUrl: './unit-component.scss',
})
export class UnitComponent {
  readonly unitsList = UNIT_VARIANTS;
  isUnitsListOpen = input.required<boolean>();
  isUnitSelected = input.required<boolean>();
  sendUnitSelection = output<UnitVariant>();
  isOpenChange = output<boolean>();

  onUnitButtonClick(): void {
    this.isOpenChange.emit(!this.isUnitsListOpen());
  }

  onUnitClick(unit: UnitVariant): void {
    this.isOpenChange.emit(false);
    this.sendUnitSelection.emit(unit);
  }

}
