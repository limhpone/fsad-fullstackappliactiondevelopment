import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const verifyJWTToken: CanActivateFn = () => {
  const jwtToken = localStorage.getItem('token');
  const router = inject(Router);

  if (!jwtToken) {
    return router.createUrlTree(['/login']);
  }

  return true;
};
