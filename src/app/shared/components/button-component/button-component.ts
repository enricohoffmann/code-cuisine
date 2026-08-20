import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [NgClass],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  buttonVariant = input<'bright' | 'dark' | 'characteristic'>('bright');
}
