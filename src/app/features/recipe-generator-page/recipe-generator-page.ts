import { Component, signal, inject } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header-component/header-component";
import { Router } from '@angular/router';
import { GenerateStep1Component } from '../../shared/components/generate-step-1-component/generate-step-1-component';
import { GenerateStep2Component } from '../../shared/components/generate-step-2-component/generate-step-2-component';
import { CallToAction } from '../../shared/components/call-to-action/call-to-action';
import { IngredientService } from '../../services/ingredient-service';
import { QuantityService } from '../../services/quantity-service';
import { PreferenceService } from '../../services/preference-service';
import { CloseScrollStrategy } from '@angular/cdk/overlay';


@Component({
  selector: 'app-recipe-generator-page',
  imports: [HeaderComponent, GenerateStep1Component, GenerateStep2Component, CallToAction],
  templateUrl: './recipe-generator-page.html',
  styleUrl: './recipe-generator-page.scss',
})
export class RecipeGeneratorPage {
  private readonly router = inject(Router);
  readonly ingredientService = inject(IngredientService);
  readonly quantityService = inject(QuantityService);
  readonly preferenceService = inject(PreferenceService);
  currentStep = signal<'stepOne' | 'stepTwo'>('stepOne');
  

  goToHome(): void {
    this.router.navigate(['home']);
  }

  goToStepTwo(): void {
    this.currentStep.set('stepTwo');
  }

  goToStepOne(): void {
    this.currentStep.set('stepOne');
  }

  startGenerateRecipe(): void {
    //Ingredients
    console.log('Ingredients: ', this.ingredientService.ingredients());

    //Quantity
    console.log('Portions: ', this.quantityService.portionsValue());
    console.log('Chefs: ', this.quantityService.chefsValue());
    
    //Preferences
    console.log('Preferences - Cooking: ', this.preferenceService.selectedTimeCharacer());
    console.log('Preferences - Cuisine: ', this.preferenceService.selectedCuisineCharacter());
    console.log('Preferences - Diet: ', this.preferenceService.selectedDietCharacter());
    
  }

}
