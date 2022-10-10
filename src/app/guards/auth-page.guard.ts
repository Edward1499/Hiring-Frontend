import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthPageGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): boolean {
        const token = localStorage.getItem('token');

        if (token) {
            this.router.navigate(['/client']);
            return false;
        }

        return true;
    }

}