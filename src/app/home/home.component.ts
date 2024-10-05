import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HomeCardComponent } from '../home-card/home-card.component';
import { Design } from '../../models/design';
import { DesignService } from '../design.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'cw-home',
  standalone: true,
  imports: [HomeCardComponent, CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  contentRendered: boolean = false;
  shirtDesigns: Design[] = [];
  hoodieDesigns: Design[] = [];

  changeDetector = inject(ChangeDetectorRef);
  designService = inject(DesignService);

  async ngOnInit(): Promise<void> {
    await this.loadDesigns();
  }

  async loadDesigns(term: string = ''): Promise<void> {
    const shirts = await this.designService.getDesigns({
      count: 5,
      type: 'Majica',
    });

    const hoodies = await this.designService.getDesigns({
      count: 5,
      type: 'Duks',
    });

    this.shirtDesigns = shirts;
    this.hoodieDesigns = hoodies;
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
}
