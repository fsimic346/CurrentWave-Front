import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Design } from '../../models/design';
import { Router } from '@angular/router';

@Component({
  selector: 'cw-product-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true })
  design!: Design;
  imageLoaded = false;

  router: Router = inject(Router);

  onImageLoad() {
    this.imageLoaded = true;
  }

  showDesign() {
    this.router.navigate(['/design', this.design.id]);
  }
}
