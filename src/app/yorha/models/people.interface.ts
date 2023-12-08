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
    Items: ConverstaionItem[];
}

export interface ConverstaionItem {
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

export interface ConversationId {
    conversationID: string;
}
