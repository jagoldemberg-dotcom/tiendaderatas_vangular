import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  password2 = '';
  enviado = false;

  onSubmit(): void {
    this.enviado = true;
  }
}
