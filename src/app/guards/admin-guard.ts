import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const auth = inject(AuthService);
  const router = inject(Router);




   // Not logged in
  if (!auth.isLoggedIn()) {

    router.navigate(
      ['/login'],
      {
        queryParams: {
          returnUrl: state.url
        }
      }
    );

    return false;
  }
  // NO PERMISSION
if (!auth.isAdmin()) {

  router.navigate(['/unauthorized']);

  return false;
}

  return true;
};
