import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineCategorieComponent } from './cuisine-categorie-component';

describe('CuisineCategorieComponent', () => {
  let component: CuisineCategorieComponent;
  let fixture: ComponentFixture<CuisineCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuisineCategorieComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CuisineCategorieComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
