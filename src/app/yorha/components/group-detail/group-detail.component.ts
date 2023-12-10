import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
    Observable,
    Subject,
    debounceTime,
    distinctUntilChanged,
    takeUntil,
} from 'rxjs';
import { LocalStorageAuthValue } from 'src/app/auth/models/login-response.interface';
import { TimerService } from '../../services/timer.service';
import { ActivatedRoute } from '@angular/router';
import {
    GroupConversationItem,
    GroupConversationSendMessage,
} from '../../models/group.interface';
import {
    loadGroupConversation,
    sendGroupConversationMessage,
    updateGroupConversation,
} from 'src/app/store/actions/group-conversation.actions';
import {
    selectGroupConversationItems,
    selectGroupMessagesLoading,
    selectSince,
} from 'src/app/store/selectors/group-conversation.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteGroup } from 'src/app/store/actions/group.actions';

@Component({
    selector: 'app-group-detail',
    templateUrl: './group-detail.component.html',
    styleUrls: [
        './styles/group-detail.component.scss',
        './styles/group-detail-form.component.scss',
        './styles/group-detail-modal.component.scss',
    ],
})
export class GroupDetailComponent implements OnInit, OnDestroy {
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;

    items$: Observable<GroupConversationItem[] | null> | undefined;

    isgroupMessageLoading$: Observable<boolean> | undefined;

    currentSinceValue$: Observable<number | null> | undefined;

    since: number | null = null;

    countdownSubscription$: Observable<number | null> | undefined;

    currentLocalStorage!: LocalStorageAuthValue;

    currentGroupID: string | null = null;

    groupConversationForm: FormGroup | undefined;

    private ngUnsubscribe = new Subject<void>();

    showDeleteModal = false;

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private timerService: TimerService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.initForm();
        this.getLocalStorageUid();
        this.initIsGroupMessagesLoadingObservable();

        this.route.paramMap
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((params) => {
                if (params) {
                    this.currentGroupID = params.get('groupID');
                }
            });

        if (this.currentGroupID) {
            this.initSinceValueObservable(this.currentGroupID);
            this.initCountdownSubscription(this.currentGroupID);
        }
    }

    private initForm() {
        this.groupConversationForm = this.fb.group({
            message: ['', [Validators.required]],
        });
    }

    get message() {
        return this.groupConversationForm?.get('message');
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

    private initGroupConverstionDispatch(groupID: string, since?: number) {
        this.store.dispatch(loadGroupConversation({ groupID, since }));
    }

    private initGroupConverstionItemsObservable(groupID: string) {
        this.items$ = this.store.pipe(
            select(selectGroupConversationItems(groupID)),
            distinctUntilChanged()
        );
    }
    private debounceDelay = 1000;
    private initSinceValueObservable(groupID: string) {
        this.currentSinceValue$ = this.store.pipe(
            select(selectSince(groupID)),
            distinctUntilChanged()
        );

        this.currentSinceValue$
            .pipe(
                takeUntil(this.ngUnsubscribe),
                debounceTime(this.debounceDelay)
            )
            .subscribe((value) => {
                this.since = value;
                if (value) {
                    this.initGroupConverstionDispatch(groupID, value);
                    this.initGroupConverstionItemsObservable(groupID);
                } else {
                    this.initGroupConverstionDispatch(groupID);
                    this.initGroupConverstionItemsObservable(groupID);
                }

                this.scrollToBottom();
            });
    }

    private scrollToBottom() {
        if (this.scrollContainer) {
            this.scrollContainer.nativeElement.scrollTop =
                this.scrollContainer.nativeElement.scrollHeight;
        }
    }

    onUpdateGroupMessages() {
        if (this.currentGroupID) {
            if (this.since) {
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

        this.isgroupMessageLoading$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.scrollToBottom();
            });
    }

    private initCountdownSubscription(groupID: string) {
        if (groupID) {
            this.countdownSubscription$ = this.timerService.getTimer(groupID);
        }
    }

    onSendConversationMessage() {
        if (this.groupConversationForm?.invalid) {
            return;
        }

        if (this.groupConversationForm?.valid && this.currentGroupID) {
            const message: GroupConversationSendMessage = {
                groupID: this.currentGroupID,
                message: this.groupConversationForm.value.message,
                since: Date.now(),
            };

            this.store.dispatch(sendGroupConversationMessage(message));
            this.groupConversationForm.reset();
        }
    }

    openDeleteModal() {
        this.showDeleteModal = true;
    }

    cancelGroupDelete() {
        this.showDeleteModal = false;
    }

    confirmDelete() {
        const groupId = this.currentGroupID;

        if (groupId) {
            this.store.dispatch(deleteGroup({ groupId }));
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
