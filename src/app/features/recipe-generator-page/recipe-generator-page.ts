import { Component, signal } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header-component/header-component";
import { UnitComponent } from '../../shared/components/unit-component/unit-component';
import { UnitVariant } from '../../shared/utils/types';


@Component({
  selector: 'app-recipe-generator-page',
  imports: [HeaderComponent, UnitComponent],
  templateUrl: './recipe-generator-page.html',
  styleUrl: './recipe-generator-page.scss',
})
export class RecipeGeneratorPage {
  isUnitListOpen = signal<boolean>(false);
  currentUnit = signal<UnitVariant>('gram');

  onChooseUnit(unit: UnitVariant): void {
    this.currentUnit.set(unit);    
  }
}
