import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_REGISTER } from '../../../../../constants';
import { RegisterFormValue } from '../../models/register.interface';

@Injectable()
export class RegisterService {
    private apiUrl = APP_REGISTER;

    constructor(private http: HttpClient) {}

    registerUser(value: RegisterFormValue) {
        const { name, email, password } = value;

        const body = {
            name,
            email,
            password,
        };

        return this.http.post(this.apiUrl, body);
    }
}
