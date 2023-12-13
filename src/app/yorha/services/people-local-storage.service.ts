import { Injectable } from '@angular/core';
import { PeopleItem } from '../models/people.interface';

@Injectable({
    providedIn: 'root',
})
export class PeopleLocalStorageService {
    private readonly PEOPLE_KEY = 'people';

    getPeopleStorage(): PeopleItem[] {
        const peopleValue = localStorage.getItem(this.PEOPLE_KEY);
        const people = (peopleValue && JSON.parse(peopleValue)) || [];

        return people || [];
    }

    addPeopleListToStorage(conversationID: PeopleItem[]) {
        const people = [...conversationID];
        console.log('people length:', people.length);

        localStorage.setItem(this.PEOPLE_KEY, JSON.stringify(people));
    }
}
