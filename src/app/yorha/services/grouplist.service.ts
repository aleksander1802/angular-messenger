import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    APP_GROUPS_LIST,
    APP_GROUPS_CREATE,
    APP_GROUPS_DELETE,
} from '../../../../constants';
import { GroupList, GroupItem } from '../models/groups.interface';

@Injectable({
    providedIn: 'root',
})
export class GroupListService {
    constructor(private http: HttpClient) {}

    getGroups(): Observable<GroupList> {
        return this.http.get<GroupList>(APP_GROUPS_LIST);
    }

    createGroup(name: string): Observable<GroupItem> {
        return this.http.post<GroupItem>(APP_GROUPS_CREATE, { name });
    }

    deleteGroup(groupId: string) {
        const url = APP_GROUPS_DELETE.replace('{:groupID}', groupId);
        return this.http.delete(url);
    }
}
