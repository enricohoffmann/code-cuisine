import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-dialog-component',
  imports: [],
  templateUrl: './dialog-component.html',
  styleUrl: './dialog-component.scss',
})
export class DialogComponent {
  dialogVariant = input<'notice' | 'problem'>('notice');
  isClosing = signal<boolean>(false);

  title = input<string>('');
  message = input<string>('');

  closeEvent = output<void>();


  onDialogClose(): void {
    this.isClosing.set(true);
    setTimeout(() => {
      this.closeEvent.emit();
    }, 400)
  }
}
