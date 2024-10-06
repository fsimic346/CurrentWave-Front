import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Design } from '../../models/design';
import { DesignService } from '../design.service';
import { CartService } from '../cart.service';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cw-design',
  standalone: true,
  imports: [],
  templateUrl: './design.component.html',
  styleUrl: './design.component.scss',
})
export class DesignComponent implements OnInit {
  design?: Design;
  selectedSize: any;

  route: ActivatedRoute = inject(ActivatedRoute);
  designService: DesignService = inject(DesignService);
  cartService: CartService = inject(CartService);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.design = await this.designService.getDesign(id);
  }

  addToCart() {
    if (!this.design) return;
    const cartItem: CartItem = {
      productId: this.design!.id,
      price: this.design!.price,
      quantity: 1,
      size: 'M',
    };
    this.cartService.addItem(cartItem);
  }
}
