import { Component, OnInit } from '@angular/core';
import { GroupItem } from '../../models/group.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectGroup } from 'src/app/store/selectors/group.selectors';
import { loadGroupList } from 'src/app/store/actions/group.actions';

@Component({
    selector: 'app-grouplist',
    templateUrl: './grouplist.component.html',
    styleUrls: [
        './styles/grouplist.component.scss',
        './styles/groupform.component.scss',
        './styles/groupmodal.component.scss',
    ],
})
export class GrouplistComponent implements OnInit {
    groupItems$: Observable<GroupItem[] | null> | undefined;
    showDeleteModal = false;
    isCreateMode = false;
    groupForm: FormGroup | undefined;

    currentLocalStorageUID = '8imkx6o537u';

    constructor(private store: Store, private fb: FormBuilder) {}

    ngOnInit() {
        this.groupItems$ = this.store.pipe(select(selectGroup));

        this.store.dispatch(loadGroupList());

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

    onCreateClick(e: Event) {
        e.preventDefault();
        this.isCreateMode = true;

        // this.profile$?.subscribe((profile) => {
        //     if (profile) {
        //         this.profileForm?.setValue({
        //             name: profile.name.S,
        //         });
        //     }
        // });
    }

    onCreateGroupSubmit(e: Event) {
        e.preventDefault();
    }

    onCancelCreate(e: Event) {
        e.preventDefault();
        this.groupForm?.reset();
        this.isCreateMode = false;
    }

    openDeleteModal(e: Event) {
        e.preventDefault();
        this.showDeleteModal = true;
    }

    cancelDelete(e: Event) {
        e.preventDefault();
        this.showDeleteModal = false;
    }

    confirmDelete(e: Event) {
        e.preventDefault();
        this.showDeleteModal = false;
    }
}
