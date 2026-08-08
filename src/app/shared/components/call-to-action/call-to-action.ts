import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-call-to-action',
  imports: [],
  templateUrl: './call-to-action.html',
  styleUrl: './call-to-action.scss',
})
export class CallToAction {
  inspiration = input<string | null>(null);
  animationState = signal<'enter' | 'leave' | null>(null);

  onPointerEnter(): void {
    this.animationState.set('enter');
  }

  onPointerLeave(): void {
    this.animationState.set('leave');
  }
}
