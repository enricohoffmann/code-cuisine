import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [NgClass],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  buttonVariant = input<'bright' | 'dark' | 'characteristic'>('bright');
  isSelected = input<boolean>(false);
}
