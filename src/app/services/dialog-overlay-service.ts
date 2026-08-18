import { inject, Injectable, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';
import { DialogComponent } from '../shared/components/dialog-component/dialog-component';

@Injectable({
  providedIn: 'root',
})
export class DialogOverlayService {
  private readonly overlay = inject(Overlay);
  private overlayRef : OverlayRef | null = null;
  private readonly closed = new Subject<void>();

  openNoticeDialog(title: string, message: string): Observable<void> {
    this.close();
    this.overlayRef = this.createOverlay();
    const dialog = this.attachDialog();
    this.initializeNoticeDialog(dialog, title, message);
    return this.closed.asObservable();
  }

  createOverlay(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      panelClass: 'dialog-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }

  private attachDialog(): ComponentRef<DialogComponent> {
    return this.overlayRef!.attach(
      new ComponentPortal(DialogComponent)
    );
  }

  close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  private initializeNoticeDialog(dialog: ComponentRef<DialogComponent>, title: string, message: string): void {
    dialog.setInput('dialogVariant', 'notice');
    dialog.setInput('title', title);
    dialog.setInput('message', message);
    dialog.instance.closeEvent.subscribe(() => this.handleDialogClose());
  }

  private handleDialogClose(): void {
    this.closed.next();
  }
}
