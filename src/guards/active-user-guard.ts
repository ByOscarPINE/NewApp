import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';

export const activeUserGuard: CanActivateFn = (route, state) => {
  const auth_service = inject(Auth);
  const router = inject(Router)
  
  auth_service.getUser().then((user) => {
    console.log(user);
    if (user) {
      router.navigate(['/home']);
      return false;
    } else {
      return true;
    };
  });
  return true;
};
