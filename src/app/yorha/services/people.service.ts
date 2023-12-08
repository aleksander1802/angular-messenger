import { Injectable } from '@angular/core';
import {
    APP_USERS,
    APP_CONVERSATIONS_LIST,
    APP_CONVERSATIONS_CREATE,
} from '../../../../constants';
import { HttpClient } from '@angular/common/http';
import {
    CompanionId,
    Conversation,
    ConversationCreateId,
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

    getConversationsList(): Observable<Conversation> {
        return this.http.get<Conversation>(APP_CONVERSATIONS_LIST);
    }

    createConversation(
        companionUid: CompanionId
    ): Observable<ConversationCreateId> {
        return this.http.post<ConversationCreateId>(
            APP_CONVERSATIONS_CREATE,
            companionUid
        );
    }
}
