import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    APP_GROUPS_LIST,
    APP_GROUPS_CREATE,
    APP_GROUPS_DELETE,
    APP_GROUP_MESSAGES,
} from '../../../../constants';
import {
    Group,
    GroupConversation,
    GroupCreateId,
} from '../models/group.interface';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    constructor(private http: HttpClient) {}

    getGroups(): Observable<Group> {
        return this.http.get<Group>(APP_GROUPS_LIST);
    }

    createGroup(name: string): Observable<GroupCreateId> {
        return this.http.post<GroupCreateId>(APP_GROUPS_CREATE, { name });
    }

    deleteGroup(groupId: string) {
        const url = APP_GROUPS_DELETE;
        const params = new HttpParams().set('groupID', groupId);

        return this.http.delete(url, { params });
    }

    getGroupMessages(groupID: string, since?: number) {
        console.log(`Service: groupID: ${groupID} since: ${since}`);

        let params = new HttpParams().set('groupID', groupID);

        if (since) {
            console.log('since');
            
            params = params.append('since', since.toString());
        }

        return this.http.get<GroupConversation>(APP_GROUP_MESSAGES, {
            params,
        });
    }
}
