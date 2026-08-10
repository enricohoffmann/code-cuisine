import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cuisine-categorie-component',
  imports: [],
  templateUrl: './cuisine-categorie-component.html',
  styleUrl: './cuisine-categorie-component.scss',
})
export class CuisineCategorieComponent {
  cuisineCategory = {
    id: '47gdfjr457ef',
    title: 'Italian cuisine',
    icon: '🤌',
    recipeImgPath: '/assets/img/italian-cuisine.webp'
  };
}
