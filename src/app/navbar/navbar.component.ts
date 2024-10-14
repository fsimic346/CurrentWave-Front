import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'cw-navbar',
  standalone: true,
  imports: [ButtonComponent, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAnimationTriggered = false;
  isHamburgerOpen = false;

  cartService = inject(CartService);
  router: Router = inject(Router);

  ngOnInit() {
    setTimeout(() => {
      this.isAnimationTriggered = true;
    }, 0);
  }

  openProductPage() {
    this.router.navigate(['/products']);
  }

  openCart() {
    this.cartService.openCart();
  }

  toggleHamburger() {
    this.isHamburgerOpen = !this.isHamburgerOpen;
  }
}
