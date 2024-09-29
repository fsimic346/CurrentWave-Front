import { Component, Input } from '@angular/core';
import { Design } from '../../models/design';
import { ButtonComponent } from '../button/button.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'cw-home-card',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss',
})
export class HomeCardComponent {
  @Input({ required: true })
  design!: Design;
}
