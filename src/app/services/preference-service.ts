import { Injectable, signal, WritableSignal, computed } from '@angular/core';
import { Characteristic, Preference } from '../interfaces/preference-interface';
import { CharacteristicSource } from '../shared/utils/types';


@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  private readonly COOKING_TIMES_NAMES: CharacteristicSource[] = [
    { name: 'Quick', description: 'up to 20min' },
    { name: 'Medium', description: '25-40min' },
    { name: 'Complex', description: 'over 45min' }
  ];
  private readonly CUISINE_NAMES: string[] = ['German', 'Italian', 'Indian', 'Japanese', 'Gourmet', 'Fusion'];
  private readonly DIET_NAMES: string[] = ['Vegetarian', 'Vegan', 'Keto', 'No preferences'];

  timePreferences = signal<Preference | null>(null);
  selectedTimeCharacer = signal<Characteristic | null>(null);
  cuisinePreferences = signal<Preference | null>(null);
  selectedCuisineCharacter = signal<Characteristic | null>(null);
  dietPreferences = signal<Preference | null>(null);
  selectedDietCharacter = signal<Characteristic | null>(null);


  constructor() {
    this.createPreferences();
  }

  createPreferences(): void {
    this.createTimePreference();
    this.createCuisinePreference();
    this.createDietPreference();
  }

  private createTimePreference(): void {
    const preference: Preference = {
      headline: 'Cooking time:',
      headlineIconUrl: '/assets/icons/schedule_two.svg',
      characteristics: []
    };
    preference.characteristics = this.createCharacteristics(this.COOKING_TIMES_NAMES);
    this.timePreferences.set(preference);
  }

  private createCuisinePreference(): void {
    const preference: Preference = {
      headline: 'Cuisine',
      headlineIconUrl: '/assets/icons/public.svg',
      characteristics: []
    };
    preference.characteristics = this.createCharacteristics(this.CUISINE_NAMES);
    this.cuisinePreferences.set(preference);
  }

  private createDietPreference(): void {
    const preference: Preference = {
      headline: 'Diet preferences',
      headlineIconUrl: '/assets/icons/fork_spoon.svg',
      characteristics: []
    };
    preference.characteristics = this.createCharacteristics(this.DIET_NAMES);
    this.dietPreferences.set(preference);
  }

  private createCharacteristics(names: string[] | CharacteristicSource[]): Characteristic[] {
    return names.map((item, index) => {
      if (typeof item === 'string') {
        return { id: index, characteristic: item, description: null, selected: false };
      }

      return { id: index, characteristic: item.name, description: item.description, selected: false };
    });
  }

  changeTimeSelection(id: number) {
    const currentTimeSelection = this.timePreferences()?.characteristics.find(t => t.id === id);
    if (!currentTimeSelection) { return; }
    this.changeSelection(id, this.timePreferences);
    this.selectedTimeCharacer.set(currentTimeSelection);
  }

  changeCuisineSelection(id: number) {
    const currentCuisineSelection = this.cuisinePreferences()?.characteristics.find(c => c.id === id);
    if(!currentCuisineSelection) {return;}
    this.changeSelection(id, this.cuisinePreferences);
    this.selectedCuisineCharacter.set(currentCuisineSelection);
  }

  changeDietSelection(id: number) {
    const currentDietSelection = this.dietPreferences()?.characteristics.find(d => d.id === id);
    if(!currentDietSelection) {return;}
    this.changeSelection(id, this.dietPreferences);
    this.selectedDietCharacter.set(currentDietSelection);
  }

  private changeSelection(characteristicId: number, preference: WritableSignal<Preference | null>): void {
    preference.update((items) => {
      if (!items) { return null; }

      return {
        ...items,
        characteristics: items.characteristics.map((item) =>
          item.id === characteristicId ? { ...item, selected: true } : { ...item, selected: false }
        )
      };
    });

  }

}
