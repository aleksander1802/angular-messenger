import { Injectable } from '@angular/core';
import { PeopleItem } from '../models/people.interface';

@Injectable({
    providedIn: 'root',
})
export class PeopleLocalStorageService {
    private readonly AUTH_KEY = 'auth';
    private readonly PEOPLE_KEY = 'people';
    private readonly CONVERSATION_KEY = 'myConversations';

    getPeopleStorage(): PeopleItem[] {
        const peopleValue = localStorage.getItem(this.PEOPLE_KEY);
        const people = (peopleValue && JSON.parse(peopleValue)) || [];

        return people || [];
    }

    updatePeopleStorage(conversationID: PeopleItem[]) {
        const peopleValue = localStorage.getItem(this.PEOPLE_KEY);
        let people = (peopleValue && JSON.parse(peopleValue)) || [];

        people = people ? [...conversationID] : [...conversationID];

        localStorage.setItem(this.PEOPLE_KEY, JSON.stringify(people));
    }

    getConversations(): string[] {
        const authDataValue = localStorage.getItem(this.AUTH_KEY);
        const authData = (authDataValue && JSON.parse(authDataValue)) || null;

        const uid = authData?.uid;

        if (uid) {
            const conversationsValue = localStorage.getItem(this.CONVERSATION_KEY);
            const conversations = (conversationsValue && JSON.parse(conversationsValue)) || {};

            return conversations[uid] || [];
        }

        return [];
    }

    addMyConversationToStorage(conversationID: string) {
        const authDataValue = localStorage.getItem(this.AUTH_KEY);
        const authData = (authDataValue && JSON.parse(authDataValue)) || null;

        const uid = authData?.uid;

        if (uid) {
            const conversationsValue = localStorage.getItem(this.CONVERSATION_KEY);
            const conversations = (conversationsValue && JSON.parse(conversationsValue)) || {};

            conversations[uid] = conversations[uid] ? [...conversations[uid], conversationID] : [conversationID];

            localStorage.setItem(this.CONVERSATION_KEY, JSON.stringify(conversations));
        }
    }

    removeMyConversationFromStorage(conversationID: string) {
        const authDataValue = localStorage.getItem(this.AUTH_KEY);
        const authData = (authDataValue && JSON.parse(authDataValue)) || null;
        const uid = authData?.uid;

        if (uid) {
            const conversationsValue = localStorage.getItem(this.CONVERSATION_KEY);
            const conversations = (conversationsValue && JSON.parse(conversationsValue)) || null;

            if (conversations) {
                conversations[uid] = conversations[uid].filter(
                    (id: string) => id !== conversationID
                );

                localStorage.setItem(this.CONVERSATION_KEY, JSON.stringify(conversations));
            }
        }
    }
}
