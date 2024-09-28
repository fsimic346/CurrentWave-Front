import { Component } from '@angular/core';
import { HomeCardComponent } from '../home-card/home-card.component';

@Component({
  selector: 'cw-home',
  standalone: true,
  imports: [HomeCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
