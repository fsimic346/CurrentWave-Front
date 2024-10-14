import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cw-simple-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './simple-nav.component.html',
  styleUrl: './simple-nav.component.scss',
})
export class SimpleNavComponent {
  isHamburgerOpen = false;
  cartService = inject(CartService);
  openCart() {
    this.cartService.openCart();
  }
  toggleHamburger() {
    this.isHamburgerOpen = !this.isHamburgerOpen;
  }
}
