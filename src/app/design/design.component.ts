import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Design } from '../../models/design';
import { DesignService } from '../design.service';
import { CartService } from '../cart.service';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from "../home-card/home-card.component";

@Component({
  selector: 'cw-design',
  standalone: true,
  imports: [CommonModule, HomeCardComponent],
  templateUrl: './design.component.html',
  styleUrl: './design.component.scss',
})
export class DesignComponent implements OnInit {
  design?: Design;
  selectedImage: any;
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedSize: string = this.sizes[0];
  id:string=''
  route: ActivatedRoute = inject(ActivatedRoute);
  designService: DesignService = inject(DesignService);
  cartService: CartService = inject(CartService);
  contentRendered: boolean = false;
  shirtDesigns: Design[] = [];
  hoodieDesigns: Design[] = [];
  changeDetector = inject(ChangeDetectorRef);

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.designService
      .getDesign(this.id)
      .then(async (design) => {
        if (design) {
          this.design = design;
          this.selectedImage = this.design.image;
          await this.loadDesigns();
        } else {
          console.error('Design not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching design:', error);
      });
      
  }

  async loadDesigns(): Promise<void> {
    if (this.design!.type === 'Majica') {
      const shirts = await this.designService.getDesigns({
        count: 5,
        type: 'Majica',
        // category: this.design!.category.toLowerCase(),
      });
  
      this.shirtDesigns = shirts.filter(shirt => shirt.id !== this.id);
    }
  
    if (this.design!.type === 'Duks') {
      const hoodies = await this.designService.getDesigns({
        count: 5,
        type: 'Duks',
        // category: this.design!.category.toLowerCase(),
      });
  
      this.hoodieDesigns = hoodies.filter(hoodie => hoodie.id !== this.id);
    }
  }
  

  onContentRendered() {
    setTimeout(() => {
      this.contentRendered = true;
      this.changeDetector.detectChanges();
    }, 0);
  }

  identify(index: number, design: Design) {
    return design.id;
  }

  selectSize(size: string) {
    this.selectedSize = size;
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
