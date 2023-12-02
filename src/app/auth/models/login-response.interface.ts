export interface LoginResponse {
    token?: string;
    uid?: string;
    type?: LoginErrorType;
    message?: string;
}

export enum LoginErrorType {
    InvalidFormDataException = 'InvalidFormDataException',
    NotFoundException = 'NotFoundException',
}
