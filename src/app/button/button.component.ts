import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'cw-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  @Input()
  iconClasses: string | undefined;
  @Input()
  text!: string;
  @Output()
  clicked = new EventEmitter<any>();

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    const ele = this.viewContainerRef.element.nativeElement as Element;

    ele.addEventListener('click', (e) => {
      this.clicked.emit(e);
    });
  }
}
