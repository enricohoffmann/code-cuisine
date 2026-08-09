import { Component, input, signal, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { ColorVariant, CTAVariant } from '../../utils/types';

@Component({
  selector: 'app-call-to-action',
  imports: [NgClass],
  templateUrl: './call-to-action.html',
  styleUrl: './call-to-action.scss',
})
export class CallToAction {
  inspiration = input<string | null>(null);
  animationState = signal<'enter' | 'leave' | null>(null);
  actionButtonEvent = output<void>();
  callToActionVariant = input<CTAVariant>('forward');
  colorVariant = input<ColorVariant>('white');

  onPointerEnter(): void {
    this.animationState.set('enter');
  }

  onPointerLeave(): void {
    this.animationState.set('leave');
  }
}
