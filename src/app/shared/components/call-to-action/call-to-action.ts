import { Component, input } from '@angular/core';

@Component({
  selector: 'app-call-to-action',
  imports: [],
  templateUrl: './call-to-action.html',
  styleUrl: './call-to-action.scss',
})
export class CallToAction {
  inspiration = input<string | null>(null);
}
