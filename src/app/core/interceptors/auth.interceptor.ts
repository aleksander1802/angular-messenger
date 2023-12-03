import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        const token = localStorage.getItem('token') || '';
        const uid = localStorage.getItem('uid') || '';
        const email = localStorage.getItem('email') || '';

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
}
