import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateStep1Component } from './generate-step-1-component';

describe('GenerateStep1Component', () => {
  let component: GenerateStep1Component;
  let fixture: ComponentFixture<GenerateStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateStep1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateStep1Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
