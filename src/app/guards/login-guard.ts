import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

export const loginGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  // ALREADY LOGGED IN
  if (auth.isLoggedIn()) {

    router.navigate(['/dashboard']);

    return false;
  }

  return true;
};
