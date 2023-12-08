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
import { LocalStorageAuthValue } from 'src/app/auth/models/login-response.interface';

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

    currentLocalStorage!: LocalStorageAuthValue;

    constructor(private store: Store, private timerService: TimerService) {}

    ngOnInit() {
        this.getLocalStorageUid();
        this.initPeopleListDispatch();
        this.initPeopleItemsObservable();
        this.initCountdownSubscription();
    }

    private getLocalStorageUid() {
        const localStorageValue = localStorage.getItem('auth');

        if (localStorageValue) {
            this.currentLocalStorage = JSON.parse(localStorageValue);
        }
    }

    private initPeopleListDispatch() {
        this.store.dispatch(loadPeopleList(this.currentLocalStorage));
    }

    private initPeopleItemsObservable() {
        this.peopleItems$ = this.store.pipe(select(selectPeople));
    }

    onUpdatePeopleList() {
        this.store.dispatch(updatePeopleList(this.currentLocalStorage));
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
