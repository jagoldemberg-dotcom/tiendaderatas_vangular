import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent {
  email = '';
  enviado = false;

  onSubmit(): void {
    this.enviado = true;
  }
}
