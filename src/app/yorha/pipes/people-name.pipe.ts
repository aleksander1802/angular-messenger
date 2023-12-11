import { Pipe, PipeTransform } from '@angular/core';
import { PeopleItem } from '../models/people.interface';

@Pipe({
    name: 'peopleName',
})
export class PeopleNamePipe implements PipeTransform {
    transform(authorID: string, peopleList: PeopleItem[]): string {
        const matchingPerson = peopleList.find(
            (person) => person.uid.S === authorID
        );

        return matchingPerson ? matchingPerson.name.S : 'unknown';
    }
}
