import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostLikedComponent } from './most-liked-component';

describe('MostLikedComponent', () => {
  let component: MostLikedComponent;
  let fixture: ComponentFixture<MostLikedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostLikedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MostLikedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
