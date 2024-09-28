import { Component, Input } from '@angular/core';
import { Design } from '../../models/design';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'cw-home-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss',
})
export class HomeCardComponent {
  // @Input({ required: true })
  // design!: Design;
}
