import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Design } from '../../models/design';
import { DesignService } from '../design.service';
import { CartService } from '../cart.service';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cw-design',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './design.component.html',
  styleUrl: './design.component.scss',
})
export class DesignComponent implements OnInit {
  design?: Design;
  selectedSize: any;
  selectedImage: any;
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  route: ActivatedRoute = inject(ActivatedRoute);
  designService: DesignService = inject(DesignService);
  cartService: CartService = inject(CartService);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.designService
      .getDesign(id)
      .then((design) => {
        if (design) {
          this.design = design;
          this.selectedImage = this.design.image;
        } else {
          console.error('Design not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching design:', error);
      });
  }

  showImage(image: any) {
    this.selectedImage = image;
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
