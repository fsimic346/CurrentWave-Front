import { Component, Input } from '@angular/core';

@Component({
  selector: 'cw-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input()
  iconClasses!: string;
  @Input()
  text!: string;
}
