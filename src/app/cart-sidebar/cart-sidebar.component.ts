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

@Component({
  selector: 'cw-cart-sidebar',
  standalone: true,
  imports: [ButtonComponent, CartItemComponent],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss',
})
export class CartSidebarComponent {
  cartService: CartService = inject(CartService);
  elRef: ElementRef = inject(ElementRef);

  cart = this.cartService.cart;

  removeItem(productId: string) {
    this.cartService.removeItem(productId);
  }

  closeCart() {
    this.cartService.closeCart();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.cart().isClosable) return;
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.cartService.closeCart();
    }
  }
}
