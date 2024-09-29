import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HomeCardComponent } from '../home-card/home-card.component';
import { Design } from '../../models/design';
import { DesignService } from '../design.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cw-home',
  standalone: true,
  imports: [HomeCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  contentRendered: boolean = false;
  designs: Design[] = [];

  changeDetector = inject(ChangeDetectorRef);
  designService = inject(DesignService);

  async ngOnInit(): Promise<void> {
    await this.loadDesigns();
  }

  async loadDesigns(term: string = ''): Promise<void> {
    const { designs, lastDoc } = await this.designService.getDesigns(100);

    this.designs = designs;
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
