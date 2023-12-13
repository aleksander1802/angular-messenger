import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { PeopleLocalStorageService } from '../../services/people-local-storage.service';
import { TimerService } from '../../services/timer.service';
import {
    deleteConversation,
    loadConversationMessage,
    sendConversationMessage,
    updateConversationMessage,
} from 'src/app/store/actions/people-conversation.actions';
import {
    Observable,
    Subject,
    debounceTime,
    distinctUntilChanged,
    takeUntil,
} from 'rxjs';
import {
    selectConversationLoading,
    selectPeopleConversationItems,
    selectPeopleConversationSince,
} from 'src/app/store/selectors/people-conversation.selectors';
import { LocalStorageAuthValue } from 'src/app/auth/models/login-response.interface';
import {
    ConversationMessageItem,
    PeopleConversationSendMessage,
    PeopleItem,
} from '../../models/people.interface';

@Component({
    selector: 'app-conversation-detail',
    templateUrl: './conversation-detail.component.html',
    styleUrls: [
        '../group-detail/styles/group-detail.component.scss',
        '../group-detail/styles/group-detail-modal.component.scss',
        '../group-detail/styles/group-detail-form.component.scss',
    ],
})
export class ConversationDetailComponent implements OnInit, OnDestroy {
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;

    items$: Observable<ConversationMessageItem[] | null> | undefined;

    conversationForm: FormGroup | undefined;

    isLoading$: Observable<boolean> | undefined;

    currentConversationID: string | null = null;

    showDeleteModal = false;

    currentLocalStorage!: LocalStorageAuthValue;

    countdownSubscription$: Observable<number | null> | undefined;

    currentSinceValue$: Observable<number | null> | undefined;

    since: number | null = null;

    private debounceDelay = 1000;

    peopleList: PeopleItem[] =
        this.peopleLocalStorageService.getPeopleStorage();

    private ngUnsubscribe = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private peopleLocalStorageService: PeopleLocalStorageService,
        private timerService: TimerService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.initForm();
        this.initIsConversationLoadingObservable();
        this.getLocalStorageUid();

        this.route.paramMap
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((params) => {
                if (params) {
                    const conversationID = params.get('conversationID');

                    this.currentConversationID = conversationID;
                }
            });

        if (this.currentConversationID) {
            this.initSinceValueObservable(this.currentConversationID);
            this.initCountdownSubscription(this.currentConversationID);
        }
    }

    private initSinceValueObservable(conversationID: string) {
        this.currentSinceValue$ = this.store.pipe(
            select(selectPeopleConversationSince(conversationID)),
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
                    this.initConverstionDispatch(conversationID, value);
                } else {
                    this.initConverstionDispatch(conversationID);
                }

                this.scrollToBottom();
            });
    }

    private initConverstionDispatch(conversationID: string, since?: number) {
        this.items$ = this.store.pipe(
            select(selectPeopleConversationItems(conversationID)),
            distinctUntilChanged()
        );

        this.store.dispatch(loadConversationMessage({ conversationID, since }));
    }

    private initForm() {
        this.conversationForm = this.fb.group({
            message: ['', [Validators.required]],
        });
    }

    get message() {
        return this.conversationForm?.get('message');
    }

    getError(controlName: string, errorName: string) {
        return this.conversationForm?.get(controlName)?.hasError(errorName);
    }

    private initIsConversationLoadingObservable() {
        this.isLoading$ = this.store.pipe(select(selectConversationLoading));

        this.isLoading$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
            this.scrollToBottom();
        });
    }

    private scrollToBottom() {
        if (this.scrollContainer) {
            this.scrollContainer.nativeElement.scrollTop =
                this.scrollContainer.nativeElement.scrollHeight;
        }
    }

    openDeleteModal() {
        this.showDeleteModal = true;
    }

    cancelDelete() {
        this.showDeleteModal = false;
    }

    confirmDelete() {
        const conversationID = this.currentConversationID;

        if (conversationID) {
            this.store.dispatch(deleteConversation({ conversationID }));
        }
    }

    private getLocalStorageUid() {
        const localStorageValue = localStorage.getItem('auth');

        if (localStorageValue) {
            this.currentLocalStorage = JSON.parse(localStorageValue);
        }
    }

    private initCountdownSubscription(conversationID: string) {
        this.countdownSubscription$ =
            this.timerService.getTimer(conversationID);
    }

    onSendConversationMessage() {
        if (this.conversationForm?.invalid) {
            return;
        }

        const defaultDate = 1702312323642;

        if (this.conversationForm?.valid && this.currentConversationID) {
            const message: PeopleConversationSendMessage = {
                conversationID: this.currentConversationID,
                message: this.conversationForm.value.message,
                since: this.since ? +this.since + 1 : defaultDate,
            };

            this.store.dispatch(sendConversationMessage(message));
            this.conversationForm.reset();
        }
    }

    onUpdateConversationMessage() {
        if (this.currentConversationID) {
            if (this.since) {
                this.store.dispatch(
                    updateConversationMessage({
                        conversationID: this.currentConversationID,
                        since: this.since,
                    })
                );
            } else {
                this.store.dispatch(
                    updateConversationMessage({
                        conversationID: this.currentConversationID,
                    })
                );
            }
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
