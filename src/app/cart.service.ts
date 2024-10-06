import { Injectable, signal } from '@angular/core';
import { ShoppingCart } from '../models/shoppingCart';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<ShoppingCart>({
    items: [],
    totalAmount: 0,
    isVisible: false,
    isClosable: false,
  });

  constructor() {}

  private calculateTotalAmount(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  openCart() {
    this.cart.update((currentCart) => {
      currentCart.isVisible = true;
      return currentCart;
    });
    setTimeout(() => {
      this.cart.update((currentCart) => {
        currentCart.isClosable = true;
        return currentCart;
      });
    }, 500);
  }

  closeCart() {
    this.cart.update((currentCart) => {
      currentCart.isVisible = false;
      currentCart.isClosable = false;
      return currentCart;
    });
  }

  addItem(item: CartItem) {
    this.cart.update((currentCart) => {
      const existingItem = currentCart.items.find(
        (i) => i.productId === item.productId && i.size == item.size
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        currentCart.items.push(item);
      }

      currentCart.totalAmount += item.price * item.quantity;

      return currentCart;
    });
  }

  removeItem(productId: string) {
    this.cart.update((currentCart) => {
      const item = currentCart.items.find((i) => i.productId === productId);

      if (item) {
        currentCart.totalAmount -= item.price * item.quantity;
        currentCart.items = currentCart.items.filter(
          (i) => i.productId !== productId
        );
      }

      return currentCart;
    });
  }
}
