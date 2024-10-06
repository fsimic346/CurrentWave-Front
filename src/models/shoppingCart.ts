import { CartItem } from './cartItem';

export type ShoppingCart = {
  items: CartItem[];
  totalAmount: number;
  isVisible: boolean;
  isClosable: boolean;
};
