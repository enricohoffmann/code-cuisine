import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateStep2Component } from './generate-step-2-component';

describe('GenerateStep2Component', () => {
  let component: GenerateStep2Component;
  let fixture: ComponentFixture<GenerateStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateStep2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateStep2Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
