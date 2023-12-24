import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    LocalStorageAuthValue,
    LoginResponse,
} from '../models/login-response.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    constructor() {
        this.checkLocalStorage();
    }

    private checkLocalStorage() {
        const authString = localStorage.getItem('auth');

        if (authString) {
            this.isLoggedInSubject.next(true);
        }
    }

    isLoggedIn(): boolean {
        return Boolean(localStorage.getItem('auth'));
    }

    saveCredentialsToLocalStorage(data: LoginResponse, email: string) {
        const authValue: LocalStorageAuthValue = {
            token: data.token || '',
            uid: data.uid || '',
            email: email || '',
        };

        localStorage.setItem('auth', JSON.stringify(authValue));

        this.isLoggedInSubject.next(true);
    }

    clearCredentials() {
        localStorage.clear();

        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie =
                name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        }

        this.isLoggedInSubject.next(false);
    }
}
