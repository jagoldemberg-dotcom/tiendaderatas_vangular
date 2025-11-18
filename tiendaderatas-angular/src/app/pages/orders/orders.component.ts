import { Component } from '@angular/core';

interface Order {
  id: number;
  fecha: string;
  total: number;
  estado: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  pedidos: Order[] = [
    { id: 1, fecha: '2025-10-01', total: 69980, estado: 'Entregado' },
    { id: 2, fecha: '2025-10-10', total: 39990, estado: 'Procesando' }
  ];
}
