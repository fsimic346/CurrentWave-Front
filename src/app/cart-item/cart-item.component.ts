import { Component, inject, Input, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Design } from '../../models/design';
import { DesignService } from '../design.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'cw-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input({ required: true })
  cartItem!: CartItem;

  cartService = inject(CartService);

  decreaseQuantity() {
    this.cartService.removeItem(this.cartItem);
  }
  increaseQuantity() {
    this.cartService.addItem({ ...this.cartItem, quantity: 1 });
  }
  deleteItem() {
    this.cartService.deleteItem(this.cartItem);
  }
  quantityChanged(event: any) {
    this.cartItem.quantity = event.target.value;
  }
}
