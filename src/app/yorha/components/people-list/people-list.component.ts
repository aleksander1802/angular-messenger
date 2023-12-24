import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, debounceTime, take, takeUntil } from 'rxjs';
import { ConversationItem, PeopleItem } from '../../models/people.interface';
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
import {
    createConversation,
    loadConversationList,
    updateConversationList,
} from 'src/app/store/actions/people-conversation.actions';
import {
    selectConversationLoading,
    selectPeopleConversationList,
} from 'src/app/store/selectors/people-conversation.selectors';
import { Router } from '@angular/router';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit, OnDestroy {
    peopleItems$: Observable<PeopleItem[] | null> | undefined;

    isPeopleListLoading$: Observable<boolean> | undefined;

    isConversationLoading$: Observable<boolean> | undefined;

    countdownSubscription$: Observable<number | null> | undefined;

    private countdownKey = 'peopleTimer';

    currentLocalStorage!: LocalStorageAuthValue;

    private ngUnsubscribe = new Subject<void>();

    existingConversation$: Observable<ConversationItem[] | null> | undefined;

    existingConversationList: ConversationItem[] | [] = [];

    private debounceDelay = 1000;

    constructor(
        private store: Store,
        private timerService: TimerService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getLocalStorageUid();
        this.initPeopleListDispatch();
        this.initPeopleItemsObservable();
        this.initIsPeopleListLoadingObservable();
        this.initIsConversationLoading();
        this.initCountdownSubscription();
        this.initExistingConversation();
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

        this.peopleItems$
            .pipe(
                takeUntil(this.ngUnsubscribe),
                debounceTime(this.debounceDelay)
            )
            .subscribe((peopleItems) => {
                if (peopleItems) {
                    this.store.dispatch(loadConversationList());
                }
            });
    }

    private initExistingConversation() {
        this.existingConversation$ = this.store.pipe(
            select(selectPeopleConversationList)
        );

        this.existingConversation$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((conversationList) => {
                if (conversationList && conversationList.length > 0) {
                    this.existingConversationList = conversationList;
                }
            });
    }

    onUpdatePeopleList() {
        this.store.dispatch(updatePeopleList(this.currentLocalStorage));
        this.store
            .pipe(debounceTime(this.debounceDelay), take(1))
            .subscribe(() => {
                this.store.dispatch(updateConversationList());
            });
    }

    private initIsPeopleListLoadingObservable() {
        this.isPeopleListLoading$ = this.store.pipe(
            select(selectPeopleListLoading)
        );
    }

    private initIsConversationLoading() {
        this.isConversationLoading$ = this.store.pipe(
            select(selectConversationLoading)
        );
    }

    private initCountdownSubscription() {
        this.countdownSubscription$ = this.timerService.getTimer(
            this.countdownKey
        );
    }

    onStartConversationWithUser(companion: string) {
        if (
            this.existingConversationList &&
            this.existingConversationList.length > 0
        ) {
            const conversation =
                this.existingConversationList.find(
                    (item) => item.companionID.S === companion
                ) || null;

            if (conversation) {
                const routeId = conversation.id.S;

                this.router.navigate(['conversation', routeId]);
            } else {
                this.store.dispatch(createConversation({ companion }));
            }
        } else {
            this.store.dispatch(createConversation({ companion }));
        }
    }

    changeColorExistingConversation(companion: string) {
        if (
            this.existingConversationList &&
            this.existingConversationList.length > 0
        ) {
            const existingConversation =
                this.existingConversationList?.find(
                    (item) => item.companionID.S === companion
                ) || null;

            if (existingConversation) {
                return companion;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
