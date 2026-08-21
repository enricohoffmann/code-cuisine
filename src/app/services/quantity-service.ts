import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuantityService {
  portionsValue = signal<number>(1);
  chefsValue = signal<number>(1);

  addPortion(): void {
    if (this.portionsValue() >= 10) { return; }
    this.portionsValue.update(portion => portion += 1);
  }

  removePortion(): void {
    if (this.portionsValue() <= 1) { return; }
    this.portionsValue.update(portion => portion -= 1);
  }

  addChef(): void {
    if (this.chefsValue() >= 10) { return; }
    this.chefsValue.update(chef => chef += 1);
  }

  removeChef(): void {
    if (this.chefsValue() <= 1) { return; }
    this.chefsValue.update(chef => chef = - 1);
  }
}
