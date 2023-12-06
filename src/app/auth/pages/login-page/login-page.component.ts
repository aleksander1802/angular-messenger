import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
    LoginErrorType,
    LoginResponse,
} from '../../models/login-response.interface';
import { LoginFormValue } from '../../models/login.interface';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
    loginForm!: FormGroup;
    isSubmitting = false;
    isHttpError = false;
    hasUserChangedInput = false;

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private formChangesSubscription: Subscription | undefined;

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private toastService: ToastService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.initForm();
        this.subscribeToFormChanges();
    }

    private initForm() {
        this.loginForm = this.fb.group({
            email: ['courses@mail.ru', [Validators.required, Validators.email]],
            password: ['1!qQwerty', [Validators.required]],
        });
    }

    private subscribeToFormChanges() {
        this.formChangesSubscription = this.loginForm.valueChanges.subscribe(
            () => {
                if (this.hasUserChangedInput) {
                    this.hasUserChangedInput = false;
                }
            }
        );
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    getError(controlName: string, errorName: string) {
        return this.loginForm.get(controlName)?.hasError(errorName);
    }

    onSubmit() {
        if (this.loginForm.invalid || this.isSubmitting) {
            return;
        }

        const formData: LoginFormValue = this.loginForm.value;

        this.isSubmitting = true;
        this.hasUserChangedInput = true;

        this.loginService
            .loginUser(formData)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe({
                next: (data) => this.handleLoginSuccess(data),
                error: (error) => this.handleLoginError(error),
            });
    }

    private handleLoginSuccess(data: LoginResponse) {
        this.isSubmitting = false;

        this.authService.saveCredentialsToLocalStorage(
            data,
            this.loginForm.value.email
        );

        this.showToastAndRedirect();
    }

    private showToastAndRedirect() {
        this.toastService.showToast('Login successful!', false);
        this.router.navigateByUrl('/');
    }

    private handleLoginError(error: HttpErrorResponse) {
        this.isSubmitting = false;

        if (error.status === 400) {
            const errorType: LoginErrorType = error.error.type;

            switch (errorType) {
                case LoginErrorType.InvalidFormDataException:
                    this.handleInvalidFormDataException(error.error.message);
                    break;
                case LoginErrorType.NotFoundException:
                    this.handleNotFoundException(error.error.message);
                    break;
                default:
                    this.handleOtherErrors();
            }
        } else {
            this.isHttpError = true;
            this.handleOtherErrors();
        }
    }

    private handleInvalidFormDataException(message: string) {
        this.toastService.showToast(message, true);
    }

    private handleNotFoundException(message: string) {
        this.toastService.showToast(message, true);
    }

    private handleOtherErrors() {
        this.toastService.showToast('Login error', true);
    }

    ngOnDestroy() {
        if (this.formChangesSubscription) {
            this.formChangesSubscription.unsubscribe();
        }

        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
