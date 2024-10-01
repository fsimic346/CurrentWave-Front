import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cw-navbar',
  standalone: true,
  imports: [ButtonComponent,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], 
})
export class NavbarComponent implements OnInit {

  isAnimationTriggered = false;

  ngOnInit() {
    setTimeout(() => {
      this.isAnimationTriggered = true;
    }, 0); 
  }
}
