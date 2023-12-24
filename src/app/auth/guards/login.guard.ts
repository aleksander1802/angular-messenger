import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginPermissionsService {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate() {
        return this.authService.isLoggedIn$.pipe(
            map((isLoggedIn) => {
                if (!isLoggedIn) {
                    return true;
                }

                this.router.navigateByUrl('/');
                return false;
            })
        );
    }
}

export const LoginGuard: CanActivateFn = () =>
    inject(LoginPermissionsService).canActivate();
