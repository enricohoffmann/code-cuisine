import { Component, input, signal, output, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ColorVariant, CTAVariant } from '../../utils/types';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 650px)').pipe(
      map(result => result.matches)
    ), {initialValue: false}
  );

  onPointerEnter(): void {
    this.animationState.set('enter');
  }

  onPointerLeave(): void {
    this.animationState.set('leave');
  }
}
