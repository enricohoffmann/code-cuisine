import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header-component/header-component";

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
