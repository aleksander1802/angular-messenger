import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneratedGroup, GroupItem } from '../../models/group.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, filter } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
    selectGroup,
    selectGroupLoading,
} from 'src/app/store/selectors/group.selectors';
import {
    createGroup,
    deleteGroup,
    loadGroupList,
    updateGroupList,
} from 'src/app/store/actions/group.actions';
import { LocalStorageAuthValue } from 'src/app/auth/models/login-response.interface';
import { TimerService } from '../../services/timer.service';
import { GroupStorageService } from '../../services/group-local-storage.service';

@Component({
    selector: 'app-grouplist',
    templateUrl: './grouplist.component.html',
    styleUrls: [
        './styles/grouplist.component.scss',
        './styles/groupform.component.scss',
        './styles/groupmodal.component.scss',
    ],
})
export class GrouplistComponent implements OnInit, OnDestroy {
    groupItems$: Observable<GroupItem[] | null> | undefined;
    isGroupLoading$: Observable<boolean> | undefined;

    showDeleteModal = false;
    isCreateMode = false;
    groupForm: FormGroup | undefined;

    currentLocalStorageUID!: LocalStorageAuthValue;

    private createGroupSubscription: Subscription | undefined;

    countdownSubscription: Observable<number | null> | undefined;
    private countdownKey = 'groupTimer';

    private currentGroupId: string | null = null;

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private timerService: TimerService,
        private groupStorageService: GroupStorageService
    ) {}

    ngOnInit() {
        this.initGroupListDispatch();
        this.getLocalStorageUid();
        this.initForm();
        this.initGroupItemsObservable();
        this.initIsGroupLoadingObservable();
        this.initCountdownSubscription();
    }

    private initGroupItemsObservable() {
        this.groupItems$ = this.store.pipe(select(selectGroup));
        this.createGroupSubscription = this.groupItems$
            .pipe(filter((groups) => groups !== null))
            .subscribe((groups) => {
                this.onCancelCreate();
                this.cancelGroupDelete();

                if (groups) {
                    this.initMyGroups(groups);
                }
            });
    }

    private initMyGroups(groups: GroupItem[]) {
        const currentUid = this.currentLocalStorageUID.uid;
        const myGroup = groups.filter(
            (group) => group.createdBy.S === currentUid
        );

        if (myGroup) {
            for (let i = 0; i < myGroup.length; i += 1) {
                this.groupStorageService.addMyGroupToStorage(myGroup[i].id.S);
            }
        }
    }

    private initIsGroupLoadingObservable() {
        this.isGroupLoading$ = this.store.pipe(select(selectGroupLoading));
    }

    private initCountdownSubscription() {
        this.countdownSubscription = this.timerService.getTimer(
            this.countdownKey
        );
    }

    private initGroupListDispatch() {
        this.store.dispatch(loadGroupList());
    }

    onRefreshClick() {
        this.store.dispatch(updateGroupList());
    }

    private getLocalStorageUid() {
        const localStorageUid = localStorage.getItem('auth');

        if (localStorageUid) {
            this.currentLocalStorageUID = JSON.parse(localStorageUid);
        }
    }

    private initForm() {
        this.groupForm = this.fb.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(30),
                    Validators.pattern(/^[a-zA-Z0-9 ]*$/),
                ],
            ],
        });
    }

    get name() {
        return this.groupForm?.get('name');
    }

    getError(controlName: string, errorName: string) {
        return this.groupForm?.get(controlName)?.hasError(errorName);
    }

    onCreateClick() {
        this.isCreateMode = true;
    }

    onCreateGroupSubmit() {
        if (this.groupForm?.valid) {
            const groupName = this.groupForm.value.name;

            const newGeneratedGroup: GeneratedGroup = {
                name: groupName,
                createdAt: Date.now().toString(),
                createdBy: this.currentLocalStorageUID.uid,
            };

            this.store.dispatch(createGroup(newGeneratedGroup));
        }
    }

    onCancelCreate() {
        this.groupForm?.reset();
        this.isCreateMode = false;
    }

    openDeleteModal(groupId?: string) {
        if (groupId) {
            this.currentGroupId = groupId;
        }
        this.showDeleteModal = true;
    }

    cancelGroupDelete() {
        this.currentGroupId = null;
        this.showDeleteModal = false;
    }

    confirmDelete() {
        const groupID = this.currentGroupId;

        if (groupID) {
            this.store.dispatch(deleteGroup({ groupID }));
        }
    }

    ngOnDestroy() {
        this.createGroupSubscription?.unsubscribe();
    }
}
