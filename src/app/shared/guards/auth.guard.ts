import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { getStoreage } from '../../utils/index-util';

@Injectable()
export class AuthGuard implements CanActivate {
    private isLoggedIn!: boolean;

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('CanActivate Run.');
        
        getStoreage('isLoggedIn') ? this.isLoggedIn = true : this.isLoggedIn = false;

        // ถ้า true ไปหน้า dashboard
        if (this.isLoggedIn) return true;

        // ถ้า false ไปหน้า /auth/login
        this.router.navigateByUrl('/auth/login');
        return false;
    }

}