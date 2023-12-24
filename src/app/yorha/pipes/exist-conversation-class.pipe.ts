import { Pipe, PipeTransform } from '@angular/core';
import { ConversationItem } from '../models/people.interface';

@Pipe({
    name: 'existConversationClass',
})
export class ExistConversationClassPipe implements PipeTransform {
    transform(authorID: string, conversationList: ConversationItem[]): boolean {
        const matchingPerson = conversationList.find(
            (conversation) => conversation.companionID.S === authorID
        );

        return matchingPerson ? true : false;
    }
}
