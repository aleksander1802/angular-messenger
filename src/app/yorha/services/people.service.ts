import { Injectable } from '@angular/core';
import {
    APP_USERS,
    APP_CONVERSATION_LIST,
    APP_CONVERSATION_CREATE,
    APP_CONVERSATION_MESSAGES,
    APP_CONVERSATION_ADD_NEW_MESSAGE,
    APP_CONVERSATION_DELETE,
} from '../../../../constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
    Conversation,
    ConversationID,
    ConversationMessage,
    People,
} from '../models/people.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PeopleService {
    constructor(private http: HttpClient) {}

    getPeopleList(): Observable<People> {
        return this.http.get<People>(APP_USERS);
    }

    getConversationList(): Observable<Conversation> {
        return this.http.get<Conversation>(APP_CONVERSATION_LIST);
    }

    createConversation(companion: string): Observable<ConversationID> {
        return this.http.post<ConversationID>(APP_CONVERSATION_CREATE, {
            companion,
        });
    }

    getConversationMessages(conversationID: string, since?: number) {
        let params = new HttpParams().set('conversationID', conversationID);

        if (since) {
            params = params.append('since', since.toString());
        }

        return this.http.get<ConversationMessage>(APP_CONVERSATION_MESSAGES, {
            params,
        });
    }

    sendConversationMessage(conversationID: string, message: string) {
        const body = { conversationID, message };

        return this.http.post(APP_CONVERSATION_ADD_NEW_MESSAGE, body);
    }

    deleteConversation(conversationID: string) {
        const params = new HttpParams().set('conversationID', conversationID);

        return this.http.delete(APP_CONVERSATION_DELETE, { params });
    }
}
