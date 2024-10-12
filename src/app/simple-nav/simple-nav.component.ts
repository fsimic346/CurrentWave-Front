import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'cw-simple-nav',
  standalone: true,
  imports: [],
  templateUrl: './simple-nav.component.html',
  styleUrl: './simple-nav.component.scss',
})
export class SimpleNavComponent {
  cartService = inject(CartService);
  openCart() {
    this.cartService.openCart();
  }
}
