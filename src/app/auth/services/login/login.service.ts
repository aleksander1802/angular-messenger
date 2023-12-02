import { Injectable } from '@angular/core';
import { APP_LOGIN } from '../../../../../constants';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../../models/login-response.interface';
import { LoginFormValue } from '../../models/login.interface';

@Injectable()
export class LoginService {
    private apiUrl = APP_LOGIN;

    constructor(private http: HttpClient) {}

    loginUser(value: LoginFormValue) {
        const { email, password } = value;

        const body = {
            email,
            password,
        };

        return this.http.post<LoginResponse>(this.apiUrl, body);
    }
}
