import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { SHIPPING_COST } from '../consts';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cw-cart',
  standalone: true,
  imports: [CartItemComponent, CommonModule, ButtonComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService: CartService = inject(CartService);
  cart = this.cartService.cart;
  SHIPPING_COST = this.cart().items.length > 0 ? SHIPPING_COST : 0;
}
