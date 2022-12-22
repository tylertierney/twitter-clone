import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
//   {
//   providedIn: 'root'
// }
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(
      map((user) => {
        if (user) {
          this.authService.user$.next(user);
          return true;
        }
        // console.log('auth is false');
        this.router.navigate(['login']);
        return false;
      })
    );
  }
}
