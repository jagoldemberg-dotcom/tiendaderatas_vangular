import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  perfilForm!: FormGroup;
  usuario?: Usuario | null;
  mensajeExito = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioActual();

    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [{ value: this.usuario.email, disabled: true }],
      edad: [this.usuario.edad, [Validators.required, Validators.min(13)]],
      direccion: [this.usuario.direccion ?? '']
    });
  }

  get f() {
    return this.perfilForm?.controls;
  }

  onSubmit(): void {
    if (!this.perfilForm || this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    const { nombre, edad, direccion } = this.perfilForm.getRawValue();

    const actualizado = this.authService.actualizarPerfil({
      nombre,
      edad,
      direccion
    });

    if (actualizado) {
      this.usuario = actualizado;
      this.mensajeExito = 'Perfil actualizado correctamente.';
    }
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
