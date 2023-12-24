import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private toastSubject = new Subject<{ message: string; isError: boolean }>();
    private closeToastSubject = new Subject<void>();

    toast$ = this.toastSubject.asObservable();
    closeToast$ = this.closeToastSubject.asObservable();

    showToast(message: string, isError: boolean) {
        this.toastSubject.next({ message, isError });
    }

    closeToast() {
        this.closeToastSubject.next();
    }
}
