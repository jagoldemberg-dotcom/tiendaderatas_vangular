import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  perfilForm!: FormGroup;
  usuario: any = null;
  mensajeExito: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Ajusta la clave según cómo guardes el usuario al hacer login
    const stored = localStorage.getItem('usuarioActual');
    if (stored) {
      this.usuario = JSON.parse(stored);
    }

    this.perfilForm = this.fb.group({
      nombre: [
        this.usuario?.nombre || '',
        [Validators.required, Validators.minLength(3)]
      ],
      email: [
        { value: this.usuario?.email || '', disabled: true },
        [Validators.required, Validators.email]
      ],
      edad: [
        this.usuario?.edad ?? null,
        [Validators.required, Validators.min(13)]
      ],
      direccion: [this.usuario?.direccion || '']
    });
  }

  onSubmit(): void {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    // getRawValue incluye también los controles deshabilitados (email)
    const datosFormulario = this.perfilForm.getRawValue();

    const usuarioActualizado = {
      ...this.usuario,
      ...datosFormulario
    };

    this.usuario = usuarioActualizado;
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActualizado));

    this.mensajeExito = 'Perfil actualizado correctamente.';
    setTimeout(() => {
      this.mensajeExito = null;
    }, 3000);
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/login']);
  }
}
