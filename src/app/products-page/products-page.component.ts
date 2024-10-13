import { Component, inject, OnInit } from '@angular/core';
import { Design } from '../../models/design';
import { DesignService } from '../design.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cw-products-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FormsModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent implements OnInit {
  shirtDesigns: Design[] = [];
  filteredDesigns: Design[] = [];
  selectedSort: string = 'new';

  selectedTypes: Set<string> = new Set();
  selectedCategories: Set<string> = new Set();

  designService: DesignService = inject(DesignService);

  async ngOnInit(): Promise<void> {
    await this.loadDesigns();
    this.filteredDesigns = this.shirtDesigns;
  }

  async loadDesigns(): Promise<void> {
    this.shirtDesigns = await this.designService.getDesigns({});
    this.filterAndSortDesigns();
  }

  toggleType(type: string): void {
    if (this.selectedTypes.has(type)) {
      this.selectedTypes.delete(type);
    } else {
      this.selectedTypes.add(type);
    }
    this.filterAndSortDesigns();
  }

  toggleCategory(category: string): void {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
    this.filterAndSortDesigns();
  }

  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedSort = select.value;
    this.filterAndSortDesigns();
  }

  filterAndSortDesigns(): void {
    this.filteredDesigns = this.shirtDesigns.filter((design) => {
      const matchesType =
        this.selectedTypes.size === 0 || this.selectedTypes.has(design.type);
      const matchesCategory =
        this.selectedCategories.size === 0 ||
        this.selectedCategories.has(design.category);
      return matchesType && matchesCategory;
    });

    this.filteredDesigns.sort((a, b) => {
      switch (this.selectedSort) {
        case 'new':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case 'old':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case 'price-higher':
          return b.price - a.price;
        case 'price-lower':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }
}
