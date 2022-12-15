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
    return this.authService.user$.pipe(
      tap((user) => {
        console.log(user);
        console.log(user == true);
      }),
      map((user) => {
        if (user) {
          return true;
        }
        this.router.navigateByUrl('login');
        return false;
      })
    );
  }
}
