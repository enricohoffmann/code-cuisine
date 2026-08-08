import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header-component/header-component";
import { CallToAction } from '../../shared/components/call-to-action/call-to-action';
import { FooterComponent } from '../../layout/footer/footer-component/footer-component';


@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, CallToAction, FooterComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  readonly heroImages = [
    '/assets/img/hero-dish-01.webp',
    '/assets/img/hero-dish-02.webp',
    '/assets/img/hero-dish-03.webp',
    '/assets/img/hero-dish-04.webp',
    '/assets/img/hero-dish-05.webp',
  ];
}
