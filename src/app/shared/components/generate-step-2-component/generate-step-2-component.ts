import { Component, input, output, signal } from '@angular/core';
import { CallToAction } from "../call-to-action/call-to-action";
import { QuantitySelectorComponent } from '../quantity-selector-component/quantity-selector-component';
import { ButtonComponent } from "../button-component/button-component";
import { PreferenceComponent } from '../preference-component/preference-component';
import { Preference } from '../../../interfaces/preference-interface';

@Component({
  selector: 'app-generate-step-2-component',
  imports: [QuantitySelectorComponent, ButtonComponent, PreferenceComponent],
  templateUrl: './generate-step-2-component.html',
  styleUrl: './generate-step-2-component.scss',
})
export class GenerateStep2Component {
  portionsValue = signal<number>(1);
  chefsValue = signal<number>(1);
  timePreferences = signal<Preference | null>(null);
  cuisinePreferences = signal<Preference | null>(null);
  dietPreferences = signal<Preference | null>(null);

  constructor() {
    this.createPreferences();
  }

  createPreferences(): void {
    this.createTimePrefernce();
    this.createCuisinePreference();
    this.createDietPreference();
  }

  createTimePrefernce(): void {
    const preference: Preference = {
      headline: 'Cooking time:',
      headlineIconUrl: '/assets/icons/schedule_two.svg',
      characteristics: [
        {characteristic: 'Quick', description: 'up to 20min'},
        {characteristic: 'Medium', description: '25-40min'},
        {characteristic: 'Complex', description: 'over 45min'}
      ]
    };
    this.timePreferences.set(preference);
  }

  createCuisinePreference(): void {
    const preference: Preference = {
      headline: 'Cuisine',
      headlineIconUrl: '/assets/icons/public.svg',
      characteristics: [
        {characteristic: 'German', description: null}, {characteristic: 'Italian', description: null}, {characteristic: 'Indian', description: null},
        {characteristic: 'Japanese', description: null}, {characteristic: 'Gourmet', description: null}, {characteristic: 'Fusion', description: null}
      ]
    };
    this.cuisinePreferences.set(preference);
  }

  createDietPreference(): void {
    const preference: Preference = {
      headline: 'Diet preferences',
      headlineIconUrl: '/assets/icons/fork_spoon.svg',
      characteristics: [
        {characteristic: 'Vegetarian', description: null}, {characteristic: 'Vegan', description: null},
        {characteristic: 'Keto', description: null}, {characteristic: 'No preferences', description: null}
      ]
    };
    this.dietPreferences.set(preference);
  }


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
