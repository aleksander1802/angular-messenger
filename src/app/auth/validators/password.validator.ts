import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const { value } = control;

        const eightCharacters = value?.length >= 8;
        const uppercaseLowercase = /[a-z]/.test(value) && /[A-Z]/.test(value);
        const lettersNumbers = /\d/.test(value) && /[a-zA-Z]/.test(value);
        const specialCharacter = /[!@#?]/.test(value);

        if (
            eightCharacters &&
            uppercaseLowercase &&
            lettersNumbers &&
            specialCharacter
        ) {
            return null;
        }
        let message = '';
        if (!eightCharacters) {
            message += 'at least 8 characters, ';
        }
        if (!uppercaseLowercase) {
            message += 'a mixture of both uppercase and lowercase letters, ';
        }
        if (!lettersNumbers) {
            message += 'a mixture of letters and numbers, ';
        }
        if (!specialCharacter) {
            message +=
                'inclusion of at least one special character, e.g., ! @ # ? ';
        }
        return { strongPassword: true, message };
    };
}
