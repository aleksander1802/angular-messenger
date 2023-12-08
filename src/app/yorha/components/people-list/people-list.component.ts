import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PeopleItem } from '../../models/people.interface';
import { TimerService } from '../../services/timer.service';
import {
    loadPeopleList,
    updatePeopleList,
} from 'src/app/store/actions/people.actions';
import { selectPeople } from 'src/app/store/selectors/people.selectors';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit, OnDestroy {
    peopleItems$: Observable<PeopleItem[] | null> | undefined;

    isPeopleListLoading$: Observable<boolean> | undefined;

    countdownSubscription$: Observable<number | null> | undefined;

    peopleItemSubscription: Subscription | undefined;

    private countdownKey = 'peopleTimer';

    // people$: PeopleItem[] = [
    //     {
    //         name: {
    //             S: 'coco',
    //         },
    //         uid: {
    //             S: 'qbkcou256a',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'xxxx',
    //         },
    //         uid: {
    //             S: '62lfpcl2u1j',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'S',
    //         },
    //         uid: {
    //             S: '67vqsxoun2',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'fwdedwfe',
    //         },
    //         uid: {
    //             S: '506ee6lg6ac',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'test',
    //         },
    //         uid: {
    //             S: 'v98pp0x5jcb',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'kola',
    //         },
    //         uid: {
    //             S: 'c4k8p02elvd',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'yyyy',
    //         },
    //         uid: {
    //             S: 'u87m344xqp',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'pol',
    //         },
    //         uid: {
    //             S: '1jo2en2qya3',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'Qwerty',
    //         },
    //         uid: {
    //             S: 'j3hntfhsxpo',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'user',
    //         },
    //         uid: {
    //             S: 'tpm5uz6kfrj',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'pavel',
    //         },
    //         uid: {
    //             S: 'qeoh1floalc',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'name name',
    //         },
    //         uid: {
    //             S: 'z2t47nhmg1',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'qwe',
    //         },
    //         uid: {
    //             S: 'q62qh792f2g',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'Denis Ivanch',
    //         },
    //         uid: {
    //             S: 'qaxgonm0cxo',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'yyyy',
    //         },
    //         uid: {
    //             S: 'tx0f0e10uc',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'Alex',
    //         },
    //         uid: {
    //             S: 'zmltnrgbapb',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'yyyy',
    //         },
    //         uid: {
    //             S: 'x26nd2s2k0r',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'user',
    //         },
    //         uid: {
    //             S: 'ptqh27ut5s',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'fdgdf',
    //         },
    //         uid: {
    //             S: '0x2nudeprgm',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'asdf',
    //         },
    //         uid: {
    //             S: '4of8kfbs65g',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'qwer',
    //         },
    //         uid: {
    //             S: 'mmi4pi2mc3r',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'pppo',
    //         },
    //         uid: {
    //             S: '99826aid9o',
    //         },
    //     },
    //     {
    //         name: {
    //             S: 'xxx',
    //         },
    //         uid: {
    //             S: 'wuns3bs3lb8',
    //         },
    //     },
    // ];

    constructor(private store: Store, private timerService: TimerService) {}

    ngOnInit() {
        this.initPeopleListDispatch();
        this.initPeopleItemsObservable();
        this.initCountdownSubscription();
    }

    private initPeopleListDispatch() {
        this.store.dispatch(loadPeopleList());
    }

    private initPeopleItemsObservable() {
        this.peopleItems$ = this.store.pipe(select(selectPeople));
    }

    onUpdatePeopleList() {
        this.store.dispatch(updatePeopleList());
    }

    private initCountdownSubscription() {
        this.countdownSubscription$ = this.timerService.getTimer(
            this.countdownKey
        );
    }

    ngOnDestroy() {
        if (this.peopleItemSubscription) {
            this.peopleItemSubscription.unsubscribe();
        }
    }
}
