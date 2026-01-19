import { inject } from '@angular/core'; // Necesario para usar servicios en funciones
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token'); // Buscamos el token de  Login

  if (token) {
    // Si existe el token, permitimos el paso a la Homepage
    return true;
  } else {
    // Si NO existe, redirigimos al componente de aviso
    // Podrías mandarlo directo a /login, pero querías mostrar botones primero
    router.navigate(['/acceso-denegado']);
    return false;
  }
};