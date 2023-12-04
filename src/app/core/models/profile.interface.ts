export interface UserProfile {
    email: {
        S: string;
    };
    name: {
        S: string;
    };
    uid: {
        S: string;
    };
    createdAt: {
        S: string;
    };
}

export interface UserProfileName {
    name: string;
}
