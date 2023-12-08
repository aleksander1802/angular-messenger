import { Injectable } from '@angular/core';
import {
    APP_USERS,
    APP_CONVERSATIONS_LIST,
    APP_CONVERSATIONS_CREATE,
} from '../../../../constants';
import { HttpClient } from '@angular/common/http';
import { CompanionId } from '../models/people.interface';

@Injectable({
    providedIn: 'root',
})
export class PeopleService {
    constructor(private http: HttpClient) {}

    getPeopleList() {
        return this.http.get(APP_USERS);
    }

    getConversationsList() {
        return this.http.get(APP_CONVERSATIONS_LIST);
    }

    createConversation(companionUid: CompanionId) {
        return this.http.post(APP_CONVERSATIONS_CREATE, companionUid);
    }
}
