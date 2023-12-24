import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const { value } = control;

        const uppercase = /[A-Z]/.test(value);
        const digit = /\d/.test(value);
        const specialCharacter = /[!@#?]/.test(value);

        if (uppercase && digit && specialCharacter) {
            return null;
        }

        let message = '';

        if (!uppercase) {
            message += 'at least one capital letter, ';
        }
        if (!digit) {
            message += 'at least one digit, ';
        }
        if (!specialCharacter) {
            message += 'at least one special character, e.g., ! @ # ? ';
        }
        return { strongPassword: true, message };
    };
}
