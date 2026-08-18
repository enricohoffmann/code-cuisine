import { Component, input, output } from '@angular/core';
import { ColorVariant } from '../../../shared/utils/types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header-component',
  imports: [NgClass],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  headerVariant = input.required<ColorVariant>();
  headerIconEvent = output<void>();
  isClickable = input<boolean>(false);

  headIconClick(): void {
    this.headerIconEvent.emit();
  }
}
