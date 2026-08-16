import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsListItemComponent } from './ingredients-list-item-component';

describe('IngredientsListItemComponent', () => {
  let component: IngredientsListItemComponent;
  let fixture: ComponentFixture<IngredientsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsListItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
