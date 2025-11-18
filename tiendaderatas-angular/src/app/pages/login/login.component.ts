import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  enviado = false;

  onSubmit(): void {
    this.enviado = true;
  }
}
