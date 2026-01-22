import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Declaración para que TypeScript reconozca la librería externa de partículas
declare var particlesJS: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initParticles();
  }

  ingresar() {
    if (this.form.valid) {
      this.http.post('http://localhost:8000/api/auth/login/', this.form.value)
        .subscribe({
          next: (res: any) => {
            localStorage.setItem('access_token', res.access);
            localStorage.setItem('refresh_token', res.refresh);
            this.router.navigate(['/homepage']);
          },
          error: () => {
            alert('Usuario o contraseña incorrecta');
          }
        });
    }
  }

  initParticles(): void {
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.5,
          "direction": "none",
          "random": true,
          "out_mode": "out"
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "grab" },
          "onclick": { "enable": true, "mode": "push" }
        }
      },
      "retina_detect": true
    });
  }
}