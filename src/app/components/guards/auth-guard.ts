import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authCanActivate = (): CanActivateFn => {
  return () => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);
    return authService.isAuthenticated().pipe(
      map((user) => {
        if (user) {
          return true;
        }
        router.navigate(['login']);
        return false;
      })
    );
  };
};
