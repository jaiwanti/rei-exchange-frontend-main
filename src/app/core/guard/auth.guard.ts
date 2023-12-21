import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable, of, Subject, Subscription } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    moduleId!: number;
    private unsubscribe = new Subject();
    constructor(private router: Router,
        ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!localStorage.getItem('user')) {
            this.router.navigate(['/']);
            return false;
        }
        if (state.url !== '/portal/dashboard') {
            let permissionList = localStorage.getItem('user');
            if (permissionList){
                return true;
            }
            else{
                return false;
            }
            //}
            // else {
            //     this.router.navigate(['/portal/unauthorized']);
            // }
        }
        else {
            return true;
        }
    }
}
