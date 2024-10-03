import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Design } from '../../models/design';
import { DesignService } from '../design.service';

@Component({
  selector: 'cw-design',
  standalone: true,
  imports: [],
  templateUrl: './design.component.html',
  styleUrl: './design.component.scss',
})
export class DesignComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  designService: DesignService = inject(DesignService);
  design?: Design;
selectedSize: any;

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.design = await this.designService.getDesign(id);
  }
}
