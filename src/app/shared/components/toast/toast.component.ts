import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
    message = "";
    isError = false;

    private toastSubscription: Subscription | undefined;

    constructor(private toastService: ToastService) {}

    ngOnInit() {
        this.toastSubscription = this.toastService.toast$.subscribe(
            ({ message, isError }) => {
                this.message = message;
                this.isError = isError;

                setTimeout(() => {
                    this.message = '';
                }, 3000);
            }
        );
    }

    ngOnDestroy() {
        if (this.toastSubscription) {
            this.toastSubscription.unsubscribe();
        }
    }
}
