export interface People {
    Count: number;
    Items: PeopleItem[];
}

export interface PeopleItem {
    name: {
        S: string;
    };
    uid: {
        S: string;
    };
}

export interface Conversation {
    Count: number;
    Items: ConversationItem[];
}

export interface ConversationItem {
    id: {
        S: string;
    };
    companionID: {
        S: string;
    };
}

export interface CompanionId {
    companion: string;
}

export interface ConversationID {
    conversationID: string;
}

export interface ConversationMessage {
    Count: number;
    Items: ConversationMessageItem[];
}

export interface ConversationMessageItem {
    authorID: {
        S: string;
    };
    message: {
        S: string;
    };
    createdAt: {
        S: string;
    };
}
