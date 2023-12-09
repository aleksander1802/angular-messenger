import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, distinctUntilChanged, tap } from 'rxjs';
import { LocalStorageAuthValue } from 'src/app/auth/models/login-response.interface';

import { TimerService } from '../../services/timer.service';

import { ActivatedRoute } from '@angular/router';

import { GroupConversationItem } from '../../models/group.interface';
import {
    loadGroupConversation,
    updateGroupConversation,
} from 'src/app/store/actions/group-conversation.actions';
import {
    selectGroupConversationItems,
    selectGroupMessagesLoading,
    selectSince,
} from 'src/app/store/selectors/group-conversation.selectors';

@Component({
    selector: 'app-group-detail',
    templateUrl: './group-detail.component.html',
    styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit {
    items$: Observable<GroupConversationItem[] | null> | undefined;

    isgroupMessageLoading$: Observable<boolean> | undefined;

    currentSinceValue$: Observable<number | null> | undefined;

    since: number | null = null;

    countdownSubscription$: Observable<number | null> | undefined;

    currentLocalStorage!: LocalStorageAuthValue;

    currentGroupID: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private timerService: TimerService
    ) {}

    ngOnInit() {
        this.getLocalStorageUid();

        this.route.paramMap.subscribe((params) => {
            if (params) {
                this.currentGroupID = params.get('groupID');
            }
        });

        if (this.currentGroupID) {
            this.initGroupMessageDispatch(this.currentGroupID);
            this.initGroupMessageItemsObservable(this.currentGroupID);
            this.initSinceValueObservable(this.currentGroupID);
            this.initCountdownSubscription(this.currentGroupID);
        }

        this.initIsGroupMessagesLoadingObservable();
    }

    private getLocalStorageUid() {
        const localStorageValue = localStorage.getItem('auth');

        if (localStorageValue) {
            this.currentLocalStorage = JSON.parse(localStorageValue);
        }
    }

    private initGroupMessageDispatch(groupID: string) {
        this.store.dispatch(loadGroupConversation({ groupID }));
    }

    private initGroupMessageItemsObservable(groupID: string) {
        this.items$ = this.store.pipe(
            select(selectGroupConversationItems(groupID)),
            distinctUntilChanged(),
            tap((groupMessageData) =>
                console.log('GroupMessageData:', groupMessageData)
            )
        );
    }

    private initSinceValueObservable(groupID: string) {
        console.log(groupID);
        this.currentSinceValue$ = this.store.pipe(
            select(selectSince(groupID)),
            distinctUntilChanged()
        );

        this.currentSinceValue$.subscribe((value) => {
            console.log(value);

            this.since = value;
        });
    }

    onUpdateGroupMessages() {
        console.log(
            `this.currentGroupID: ${this.currentGroupID}, this.since: ${this.since}`
        );
        if (this.currentGroupID && this.since) {
            this.store.dispatch(
                updateGroupConversation({
                    groupID: this.currentGroupID,
                    since: this.since,
                })
            );
        }
    }

    private initIsGroupMessagesLoadingObservable() {
        this.isgroupMessageLoading$ = this.store.pipe(
            select(selectGroupMessagesLoading)
        );
    }

    private initCountdownSubscription(groupID: string) {
        if (groupID) {
            this.countdownSubscription$ = this.timerService.getTimer(groupID);
        }
    }
}
