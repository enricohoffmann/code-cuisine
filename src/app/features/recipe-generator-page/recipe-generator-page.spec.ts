import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeGeneratorPage } from './recipe-generator-page';

describe('RecipeGeneratorPage', () => {
  let component: RecipeGeneratorPage;
  let fixture: ComponentFixture<RecipeGeneratorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeGeneratorPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeGeneratorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
