import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';
import { ResultsPage } from './features/results-page/results-page';
import { RecipePage } from './features/recipe-page/recipe-page';
import { CookbookPage } from './features/cookbook-page/cookbook-page';
import { ImprintPage } from './features/imprint-page/imprint-page';

export const routes: Routes = [
    { path: '', component: HomePage, pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'results', component: ResultsPage },
    { path: 'recipe/:id', component: RecipePage },
    { path: 'cookbook', component: CookbookPage },
    { path: 'imprint', component: ImprintPage },
    { path: '**', redirectTo: '' }
];
