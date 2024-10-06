import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SimpleNavComponent } from './simple-nav/simple-nav.component';
import { CommonModule } from '@angular/common';
import { CartSidebarComponent } from './cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    SimpleNavComponent,
    CommonModule,
    CartSidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'current-wave';

  router: Router = inject(Router);

  isHomePage(): boolean {
    return this.router.url === '/';
  }
}
