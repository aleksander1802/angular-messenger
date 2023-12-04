import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../validators/password.validator';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { RegisterFormValue } from '../../models/register.interface';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { RegistrationErrorType } from '../../models/registration-error.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
    registerForm!: FormGroup;
    isSubmitting = false;
    isHttpError = false;
    isPrimaryDuplicationError = false;
    usedEmails: string[] = [];

    private emailSubscription: Subscription | undefined;

    constructor(
        private fb: FormBuilder,
        private registerService: RegisterService,
        private router: Router,
        private toastService: ToastService
    ) {}

    ngOnInit() {
        this.initForm();
        this.subscribeToFormChanges();
    }

    private initForm() {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(40)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, passwordValidator()]],
        });
    }

    private subscribeToFormChanges() {
        this.emailSubscription = this.registerForm
            .get('email')
            ?.valueChanges.subscribe((value) => {
                this.checkForDuplication(value);
            });
    }

    get name() {
        return this.registerForm.get('name');
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    getError(controlName: string, errorName: string) {
        return this.registerForm.get(controlName)?.hasError(errorName);
    }

    onSubmit() {
        if (this.registerForm.invalid || this.isSubmitting) {
            return;
        }

        const formData: RegisterFormValue = this.registerForm.value;

        this.isSubmitting = true;

        this.registerService.registerUser(formData).subscribe({
            next: () => this.handleRegistrationSuccess(),
            error: (error) => this.handleRegistrationError(error),
        });
    }

    private handleRegistrationSuccess() {
        this.isSubmitting = false;
        this.toastService.showToast('Registration successful!', false);

        this.usedEmails = [];

        this.router.navigate(['auth', 'signin']);
    }

    private handleRegistrationError(error: HttpErrorResponse) {
        this.isSubmitting = false;

        if (error.status === 400) {
            const errorType: RegistrationErrorType = error.error.type;

            switch (errorType) {
                case RegistrationErrorType.InvalidFormData ||
                    RegistrationErrorType.UnknownFormat ||
                    RegistrationErrorType.MissingParameters:
                    this.handleInvalidFormDataException(error.error.message);
                    break;
                case RegistrationErrorType.UserExists:
                    this.handlePrimaryDuplicationException(error.error.message);
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

    private handlePrimaryDuplicationException(message: string) {
        this.toastService.showToast(message, true);
        this.isPrimaryDuplicationError = true;
        this.registerForm.get('email')?.setErrors({ taken: true });

        const formData: RegisterFormValue = this.registerForm.value;
        this.usedEmails.push(formData.email);
    }

    private handleOtherErrors() {
        this.toastService.showToast('Registration error', true);
    }

    private checkForDuplication(value: string) {
        this.isPrimaryDuplicationError = this.usedEmails.includes(value);

        if (this.isPrimaryDuplicationError) {
            this.registerForm.get('email')?.setErrors({ taken: true });
        }
    }

    ngOnDestroy() {
        if (this.emailSubscription) {
            this.emailSubscription.unsubscribe();
        }
    }
}
