import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { LocalStorageAuthValue } from 'src/app/auth/models/login-response.interface';
import { APP_LOGIN, APP_REGISTER } from '../../../../constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        const { url } = req;
        if (!url.startsWith(APP_LOGIN || APP_REGISTER)) {
            const storageValue: LocalStorageAuthValue = JSON.parse(
                localStorage.getItem('auth') || ''
            );

            const { email, token, uid } = storageValue;

            const headers = {
                'rs-uid': uid,
                'rs-email': email,
                Authorization: `Bearer ${token}`,
            };

            const modifiedReq = req.clone({
                setHeaders: headers,
            });

            return next.handle(modifiedReq);
        }

        return next.handle(req);
    }
}
