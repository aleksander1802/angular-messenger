import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PeopleItem } from '../../models/people.interface';
import { TimerService } from '../../services/timer.service';
import {
    loadPeopleList,
    updatePeopleList,
} from 'src/app/store/actions/people.actions';
import {
    selectPeople,
    selectPeopleListLoading,
} from 'src/app/store/selectors/people.selectors';
import { LocalStorageAuthValue } from 'src/app/auth/models/login-response.interface';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
    peopleItems$: Observable<PeopleItem[] | null> | undefined;

    isPeopleListLoading$: Observable<boolean> | undefined;

    countdownSubscription$: Observable<number | null> | undefined;

    private countdownKey = 'peopleTimer';

    currentLocalStorage!: LocalStorageAuthValue;

    constructor(private store: Store, private timerService: TimerService) {}

    ngOnInit() {
        this.getLocalStorageUid();
        this.initPeopleListDispatch();
        this.initPeopleItemsObservable();
        this.initIsPeopleListLoadingObservable();
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

    private initIsPeopleListLoadingObservable() {
        this.isPeopleListLoading$ = this.store.pipe(
            select(selectPeopleListLoading)
        );
    }

    private initCountdownSubscription() {
        this.countdownSubscription$ = this.timerService.getTimer(
            this.countdownKey
        );
    }

    onStartConversationWithUser(userUid: string) {
        console.log(userUid);
    }
}
