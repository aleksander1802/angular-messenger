import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GroupStorageService {
    private readonly AUTH_KEY = 'auth';
    private readonly GROUPS_KEY = 'myGroups';

    getGroups(): string[] {
        const authDataValue = localStorage.getItem(this.AUTH_KEY);
        const authData = (authDataValue && JSON.parse(authDataValue)) || null;

        const uid = authData?.uid;

        if (uid) {
            const groupsValue = localStorage.getItem(this.GROUPS_KEY);
            const groups = (groupsValue && JSON.parse(groupsValue)) || {};

            return groups[uid] || [];
        }

        return [];
    }

    addMyGroupToStorage(groupID: string) {
        const authDataValue = localStorage.getItem(this.AUTH_KEY);
        const authData = (authDataValue && JSON.parse(authDataValue)) || null;

        const uid = authData?.uid;

        if (uid) {
            const groupsValue = localStorage.getItem(this.GROUPS_KEY);
            const groups = (groupsValue && JSON.parse(groupsValue)) || {};

            groups[uid] = groups[uid] ? [...groups[uid], groupID] : [groupID];

            localStorage.setItem(this.GROUPS_KEY, JSON.stringify(groups));
        }
    }

    removeMyGroupFromStorage(groupID: string) {
        const authDataValue = localStorage.getItem(this.AUTH_KEY);
        const authData = (authDataValue && JSON.parse(authDataValue)) || null;
        const uid = authData?.uid;

        if (uid) {
            const groupsValue = localStorage.getItem(this.GROUPS_KEY);
            const groups = (groupsValue && JSON.parse(groupsValue)) || null;

            if (groups) {
                groups[uid] = groups[uid].filter(
                    (id: string) => id !== groupID
                );

                localStorage.setItem(this.GROUPS_KEY, JSON.stringify(groups));
            }
        }
    }
}
