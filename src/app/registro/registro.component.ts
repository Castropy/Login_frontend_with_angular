import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Inicialización dentro del constructor
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  registrar() {
    if (this.form.valid) {
      this.http.post('http://localhost:8000/api/registro/', this.form.value)
        .subscribe({
          next: () => {
            alert('Usuario registrado con éxito');
            this.router.navigate(['/']); // redirige al login
          },
          error: (err) => {
            alert(err.error?.error || 'Error en el registro');
          }
        });
    }
  }
}
