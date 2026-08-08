import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header-component/header-component";
import { CallToAction } from '../../shared/components/call-to-action/call-to-action';
import { FooterComponent } from '../../layout/footer/footer-component/footer-component';
import { ButtonComponent } from '../../shared/components/button-component/button-component';


@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, CallToAction, FooterComponent, ButtonComponent],
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



}
