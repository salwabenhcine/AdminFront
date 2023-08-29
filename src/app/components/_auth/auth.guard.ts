import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
   // private userService: UserService,
     private userService : UserService,
     private router :Router,
     private auth: AuthentificationService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.getToken() !== null) {
        const role = route.data['roles'] as Array<string>;

        if (role) {
          const match = this.userService.roleMatch(role);

          if (match) {
            return true;
          } else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
      }

      this.router.navigate(['/login']);
      return false;
    }

}
