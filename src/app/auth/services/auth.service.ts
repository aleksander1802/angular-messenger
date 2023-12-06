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
        localStorage.removeItem('auth');
        this.isLoggedInSubject.next(false);
    }
}
