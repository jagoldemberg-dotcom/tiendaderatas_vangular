import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  compraFinalizada = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  get total(): number {
    return this.cartService.getTotalAmount();
  }

  finalizarCompra(): void {
    if (this.items.length === 0) {
      return;
    }
    this.compraFinalizada = true;
    // Si quisieras dejar el carrito vacío después, descomenta la siguiente línea:
    // this.cartService.clear();
  }
}
