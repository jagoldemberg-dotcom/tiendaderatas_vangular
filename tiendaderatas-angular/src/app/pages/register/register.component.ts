import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        edad: ['', [Validators.required, Validators.min(13)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
            // al menos una mayúscula y un número
            Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).*$/)
          ]
        ],
        password2: ['', Validators.required],
        // Dirección de despacho OPCIONAL
        direccion: ['']
      },
      {
        validators: this.passwordsIgualesValidator
      }
    );
  }

  // Validador de contraseñas (las dos deben ser iguales)
  passwordsIgualesValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const pass2 = group.get('password2')?.value;

    if (!pass || !pass2) {
      return null;
    }

    return pass === pass2 ? null : { passwordsNoCoinciden: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  campoInvalido(campo: string): boolean {
    const control = this.registerForm.get(campo);
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || this.enviado)
    );
  }

  onSubmit(): void {
    this.enviado = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Aquí iría la lógica real de registro (service, HTTP, etc.)
    console.log('Usuario registrado (simulado):', this.registerForm.value);
  }

  onReset(): void {
    this.enviado = false;
    this.registerForm.reset();
  }
}
