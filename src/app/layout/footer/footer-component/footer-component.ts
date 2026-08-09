import { Component, input } from '@angular/core';
import { ColorVariant } from '../../../shared/utils/types';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
})
export class FooterComponent {
  readonly colorVariant = input<ColorVariant>('white');
}
