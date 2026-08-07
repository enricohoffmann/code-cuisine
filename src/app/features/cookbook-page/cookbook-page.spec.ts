import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookbookPage } from './cookbook-page';

describe('CookbookPage', () => {
  let component: CookbookPage;
  let fixture: ComponentFixture<CookbookPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookbookPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CookbookPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
