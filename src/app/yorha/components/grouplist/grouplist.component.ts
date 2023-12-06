import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneratedGroup, GroupItem } from '../../models/group.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, filter } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
    selectCreateGroupError,
    selectGroup,
    selectGroupLoading,
} from 'src/app/store/selectors/group.selectors';
import {
    createGroup,
    loadGroupList,
} from 'src/app/store/actions/group.actions';
import { LocalStorageAuthValue } from 'src/app/auth/models/login-response.interface';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';

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
    createGroupError$: Observable<ErrorFailure | null> | undefined;

    showDeleteModal = false;
    isCreateMode = false;
    groupForm: FormGroup | undefined;

    currentLocalStorageUID!: LocalStorageAuthValue;

    private createGroupSubscription: Subscription | undefined;

    constructor(private store: Store, private fb: FormBuilder) {}

    ngOnInit() {
        this.getLocalStorageUid();
        this.initForm();

        this.groupItems$ = this.store.pipe(select(selectGroup));
        this.isGroupLoading$ = this.store.pipe(select(selectGroupLoading));

        this.createGroupError$ = this.store.pipe(
            select(selectCreateGroupError)
        );

        this.createGroupSubscription = this.groupItems$
            .pipe(filter((groups) => groups !== null))
            .subscribe(() => {
                this.onCancelCreate();
            });

        this.store.dispatch(loadGroupList());
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
                createdAt: new Date().toISOString(),
                createdBy: this.currentLocalStorageUID.uid,
            };

            this.store.dispatch(createGroup(newGeneratedGroup));
        }
    }

    onCancelCreate() {
        this.groupForm?.reset();
        this.isCreateMode = false;
    }

    openDeleteModal() {
        this.showDeleteModal = true;
    }

    cancelDelete() {
        this.showDeleteModal = false;
    }

    confirmDelete() {
        this.showDeleteModal = false;
    }

    ngOnDestroy() {
        this.createGroupSubscription?.unsubscribe();
    }
}
