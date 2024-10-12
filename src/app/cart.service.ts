import { effect, Injectable, signal } from '@angular/core';
import { ShoppingCart } from '../models/shoppingCart';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<ShoppingCart>(
    this.loadCartFromStorage() || {
      items: [],
      totalAmount: 0,
      isVisible: false,
    }
  );

  constructor() {}

  private calculateTotalAmount(items: CartItem[]): number {
    return items.reduce(
      (total, item) => total + item.design.price * item.quantity,
      0
    );
  }

  openCart() {
    this.cart.update((currentCart) => {
      currentCart.isVisible = true;
      this.saveCartToStorage(currentCart);
      return currentCart;
    });
  }

  closeCart() {
    this.cart.update((currentCart) => {
      currentCart.isVisible = false;
      this.saveCartToStorage(currentCart);
      return currentCart;
    });
  }

  addItem(item: CartItem) {
    this.cart.update((currentCart) => {
      const existingItem = currentCart.items.find(
        (i) => i.design.id === item.design.id && i.size == item.size
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        currentCart.items.push(item);
      }

      currentCart.totalAmount += item.design.price * item.quantity;
      this.saveCartToStorage(currentCart);

      return currentCart;
    });
  }

  removeItem(item: CartItem) {
    this.cart.update((currentCart) => {
      const existingItem = currentCart.items.find(
        (i) => i.design.id === item.design.id && i.size == item.size
      );

      if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity < 1) {
          currentCart.items = currentCart.items.filter(
            (i) => i != existingItem
          );
        }
      }
      currentCart.totalAmount = this.calculateTotalAmount(currentCart.items);
      this.saveCartToStorage(currentCart);
      return currentCart;
    });
  }

  deleteItem(item: CartItem) {
    this.cart.update((currentCart) => {
      const existingItem = currentCart.items.find(
        (i) => i.design.id === item.design.id && i.size == item.size
      );

      if (existingItem) {
        currentCart.items = currentCart.items.filter((i) => i != existingItem);
      }
      currentCart.totalAmount = this.calculateTotalAmount(currentCart.items);
      this.saveCartToStorage(currentCart);
      return currentCart;
    });
  }

  private saveCartToStorage(cart: ShoppingCart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private loadCartFromStorage(): ShoppingCart | null {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : null;
  }
}
