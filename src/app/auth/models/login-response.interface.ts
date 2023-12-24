export interface LoginResponse {
    token?: string;
    uid?: string;
    type?: LoginErrorType;
    message?: string;
}

export interface LocalStorageAuthValue {
    token: string;
    uid: string;
    email: string;
}

export enum LoginErrorType {
    InvalidFormDataException = 'InvalidFormDataException',
    NotFoundException = 'NotFoundException',
}
