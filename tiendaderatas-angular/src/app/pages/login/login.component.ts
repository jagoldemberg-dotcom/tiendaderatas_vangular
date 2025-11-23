import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  campoInvalido(campo: string): boolean {
    const control = this.loginForm.get(campo);
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || this.enviado)
    );
  }

  onSubmit(): void {
    this.enviado = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('Login simulado:', this.loginForm.value);
  }

  onReset(): void {
    this.enviado = false;
    this.loginForm.reset();
  }
}
