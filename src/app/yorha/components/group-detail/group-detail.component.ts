import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, distinctUntilChanged } from 'rxjs';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    hasItems: boolean | null = false;

    groupConversationForm: FormGroup | undefined;

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private timerService: TimerService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.initForm();
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

    private initForm() {
        this.groupConversationForm = this.fb.group({
            message: ['', [Validators.required]],
        });
    }

    get message() {
        return this.groupConversationForm?.get('name');
    }

    getError(controlName: string, errorName: string) {
        return this.groupConversationForm
            ?.get(controlName)
            ?.hasError(errorName);
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
            distinctUntilChanged()
        );

        this.items$.subscribe((value) => {
            console.log(value);

            this.hasItems = value && value.length > 0;
        });
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
        if (this.currentGroupID) {
            if (this.hasItems && this.since) {
                this.store.dispatch(
                    updateGroupConversation({
                        groupID: this.currentGroupID,
                        since: this.since,
                    })
                );
            } else {
                this.store.dispatch(
                    updateGroupConversation({
                        groupID: this.currentGroupID,
                    })
                );
            }
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
