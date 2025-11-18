import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isCollapsed = true;

  constructor(private cartService: CartService) {}

  get totalItems(): number {
    return this.cartService.getTotalQuantity();
  }
}
