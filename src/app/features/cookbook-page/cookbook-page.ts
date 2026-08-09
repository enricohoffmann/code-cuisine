import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header-component/header-component';
import { CallToAction } from "../../shared/components/call-to-action/call-to-action";
import { Router } from '@angular/router';
import { FooterComponent } from "../../layout/footer/footer-component/footer-component";

@Component({
  selector: 'app-cookbook-page',
  imports: [HeaderComponent, CallToAction, FooterComponent],
  templateUrl: './cookbook-page.html',
  styleUrl: './cookbook-page.scss',
})
export class CookbookPage {
  private readonly router = inject(Router);


  goToGenerator(): void {
    this.router.navigate(['generate']);
  }
}
