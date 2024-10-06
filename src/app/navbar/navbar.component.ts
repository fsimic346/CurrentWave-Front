import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'cw-navbar',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAnimationTriggered = false;

  cartService = inject(CartService);

  ngOnInit() {
    setTimeout(() => {
      this.isAnimationTriggered = true;
    }, 0);
  }

  openCart() {
    this.cartService.openCart();
  }
}
