import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public router: Router) { }
    canActivate(): boolean {
        let logged = localStorage.getItem('logged_uv');
        console.log('logged', logged)
        if (logged != 'true') {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
} 