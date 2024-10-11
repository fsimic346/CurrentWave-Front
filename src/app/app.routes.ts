import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DesignComponent } from './design/design.component';
import { ProductsPageComponent } from './products-page/products-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'design/:id', component: DesignComponent },
  { path: 'products', component: ProductsPageComponent },
];
