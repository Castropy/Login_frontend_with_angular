import { Routes } from '@angular/router';
import { LogginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
  { path: '', component: LogginComponent },       // ruta por defecto
  { path: 'registro', component: RegistroComponent } // ruta para registro
];
