import { Component, inject, Input } from '@angular/core';
import { Design } from '../../models/design';
import { ButtonComponent } from '../button/button.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

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

  router: Router = inject(Router);

  showDesign() {
    this.router.navigate(['/design', this.design.id]);
  }
}
