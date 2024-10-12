import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { CartService } from '../cart.service';
import { ButtonComponent } from '../button/button.component';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { SHIPPING_COST } from '../consts';
@Component({
  selector: 'cw-cart-sidebar',
  standalone: true,
  imports: [ButtonComponent, CartItemComponent, CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss',
})
export class CartSidebarComponent {
  cartService: CartService = inject(CartService);
  elRef: ElementRef = inject(ElementRef);

  cart = this.cartService.cart;

  SHIPPING_COST = this.cart().items.length > 0 ? SHIPPING_COST : 0;
  closeCart() {
    this.cartService.closeCart();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    const target = event.target as HTMLElement;
    const openCartElement = document.getElementById('openCart');
    const addToCartElement = document.getElementById('addToCartBtn');
    if (
      !clickedInside &&
      !addToCartElement?.contains(target) &&
      target.id != 'addToCartBtn' &&
      !openCartElement?.contains(target) &&
      target.id != 'openCart' &&
      target.id != 'deleteItem' &&
      !target.classList.contains('quantity-button') &&
      !target.classList.contains('selected-size')
    ) {
      this.cartService.closeCart();
    }
  }
}
