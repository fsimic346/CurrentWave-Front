import { Component, inject, OnInit } from '@angular/core';
import { Design } from '../../models/design';
import { DesignService } from '../design.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cw-products-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent implements OnInit {
  shirtDesigns: Design[] = [];
  designService: DesignService = inject(DesignService);

  async ngOnInit(): Promise<void> {
    await this.loadDesigns();
  }

  async loadDesigns(): Promise<void> {
    this.shirtDesigns = await this.designService.getDesigns({});
  }
}
