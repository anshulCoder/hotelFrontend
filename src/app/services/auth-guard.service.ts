import {
  ActivatedRouteSnapshot, CanActivate, NavigationEnd, NavigationStart, Router,
  RouterStateSnapshot
} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
                //console.log('Router: ', this.router);
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {

    // .then((auth: bool) => { return true; or router.navigate(['/']);}
    //console.log('canActivate: ', route, state);
    console.log(state.url);
    this.authService.setCurrentUrl(state.url);
    if (this.authService.ifAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['login']);
    }

  }

}
