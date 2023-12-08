import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PeopleItem } from '../../models/people.interface';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
    // people$: Observable<PeopleItem[] | null> | undefined;
    people$: PeopleItem[] = [
        {
            name: {
                S: 'coco',
            },
            uid: {
                S: 'qbkcou256a',
            },
        },
        {
            name: {
                S: 'xxxx',
            },
            uid: {
                S: '62lfpcl2u1j',
            },
        },
        {
            name: {
                S: 'S',
            },
            uid: {
                S: '67vqsxoun2',
            },
        },
        {
            name: {
                S: 'fwdedwfe',
            },
            uid: {
                S: '506ee6lg6ac',
            },
        },
        {
            name: {
                S: 'test',
            },
            uid: {
                S: 'v98pp0x5jcb',
            },
        },
        {
            name: {
                S: 'kola',
            },
            uid: {
                S: 'c4k8p02elvd',
            },
        },
        {
            name: {
                S: 'yyyy',
            },
            uid: {
                S: 'u87m344xqp',
            },
        },
        {
            name: {
                S: 'pol',
            },
            uid: {
                S: '1jo2en2qya3',
            },
        },
        {
            name: {
                S: 'Qwerty',
            },
            uid: {
                S: 'j3hntfhsxpo',
            },
        },
        {
            name: {
                S: 'user',
            },
            uid: {
                S: 'tpm5uz6kfrj',
            },
        },
        {
            name: {
                S: 'pavel',
            },
            uid: {
                S: 'qeoh1floalc',
            },
        },
        {
            name: {
                S: 'name name',
            },
            uid: {
                S: 'z2t47nhmg1',
            },
        },
        {
            name: {
                S: 'qwe',
            },
            uid: {
                S: 'q62qh792f2g',
            },
        },
        {
            name: {
                S: 'Denis Ivanch',
            },
            uid: {
                S: 'qaxgonm0cxo',
            },
        },
        {
            name: {
                S: 'yyyy',
            },
            uid: {
                S: 'tx0f0e10uc',
            },
        },
        {
            name: {
                S: 'Alex',
            },
            uid: {
                S: 'zmltnrgbapb',
            },
        },
        {
            name: {
                S: 'yyyy',
            },
            uid: {
                S: 'x26nd2s2k0r',
            },
        },
        {
            name: {
                S: 'user',
            },
            uid: {
                S: 'ptqh27ut5s',
            },
        },
        {
            name: {
                S: 'fdgdf',
            },
            uid: {
                S: '0x2nudeprgm',
            },
        },
        {
            name: {
                S: 'asdf',
            },
            uid: {
                S: '4of8kfbs65g',
            },
        },
        {
            name: {
                S: 'qwer',
            },
            uid: {
                S: 'mmi4pi2mc3r',
            },
        },
        {
            name: {
                S: 'pppo',
            },
            uid: {
                S: '99826aid9o',
            },
        },
        {
            name: {
                S: 'xxx',
            },
            uid: {
                S: 'wuns3bs3lb8',
            },
        },
    ];

    constructor(private store: Store) {}

    ngOnInit() {
        console.log('init');
    }

    // updatePeopleList(): void {
    //     this.store.dispatch(PeopleActions.updatePeopleList());
    // }

    isConversationActive(person: PeopleItem): boolean {
        // Add logic to check if there is an active conversation with the person
        return false;
    }

    get isUpdateButtonDisabled(): boolean {
        // Add logic to check if the update button should be disabled
        return false;
    }
}
