export enum RegistrationErrorType {
    InvalidFormData = 'InvalidFormDataException',
    UnknownFormat = 'Invalid post data',
    MissingParameters = 'Parameters "email", "name", and "password" are required',
    UserExists = 'PrimaryDuplicationException',
}
