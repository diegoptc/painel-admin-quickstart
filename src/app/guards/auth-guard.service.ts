import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private isAuthenticated = false;

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    this.isAuthenticated = token ? true : false;
    if (!this.isAuthenticated) {
      this.router.navigate(['/auth/login'], { queryParams: { nextRoute: state.url } });
    }
    return this.isAuthenticated;
  }
}
