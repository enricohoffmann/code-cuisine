import { Component, input } from '@angular/core';
import { HeaderVariant } from '../../../shared/utils/types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header-component',
  imports: [NgClass],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  headerVariant = input.required<HeaderVariant>();
}
