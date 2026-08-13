import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header-component/header-component";
import { CallToAction } from '../../shared/components/call-to-action/call-to-action';
import { FooterComponent } from '../../layout/footer/footer-component/footer-component';
import { ButtonComponent } from '../../shared/components/button-component/button-component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, FooterComponent, ButtonComponent, CallToAction],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage  {
  readonly heroImages = [
    '/assets/img/hero-dish-01.webp',
    '/assets/img/hero-dish-02.webp',
    '/assets/img/hero-dish-03.webp',
    '/assets/img/hero-dish-04.webp',
    '/assets/img/hero-dish-05.webp',
  ];

  private readonly router = inject(Router);

  goToCookbook(): void {
    this.router.navigate(['cookbook']);
  }

  goToGenerator(): void {
    this.router.navigate(['generate']);
  }

}
