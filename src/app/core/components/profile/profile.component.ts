import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    loadProfile,
    logoutProfile,
    updateProfile,
} from 'src/app/store/actions/profile.actions';
import {
    selectProfile,
    selectisProfileLoading,
} from 'src/app/store/selectors/profile.selectors';
import { UserProfile, UserProfileName } from '../../models/profile.interface';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    profile$: Observable<UserProfile | null> | undefined;
    isEditMode = false;
    profileForm: FormGroup | undefined;
    isProfileLoading$: Observable<boolean> | undefined;

    constructor(private store: Store, private fb: FormBuilder) {}

    ngOnInit() {
        this.profile$ = this.store.pipe(select(selectProfile));
        this.isProfileLoading$ = this.store.pipe(
            select(selectisProfileLoading)
        );

        this.store.dispatch(loadProfile());

        this.profileForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(40)]],
        });
    }

    get name() {
        return this.profileForm?.get('name');
    }

    getError(controlName: string, errorName: string) {
        return this.profileForm?.get(controlName)?.hasError(errorName);
    }

    onEditClick(e: Event) {
        e.preventDefault();
        this.isEditMode = true;

        this.profile$?.subscribe((profile) => {
            if (profile) {
                this.profileForm?.setValue({
                    name: profile.name.S,
                });
            }
        });
    }

    onCancelClick(e: Event) {
        e.preventDefault();
        this.profileForm?.reset();
        this.isEditMode = false;
    }

    onSaveClick(e: Event) {
        e.preventDefault();
        if (this.profileForm?.valid) {
            const updatedProfileName: UserProfileName = {
                name: this.profileForm.value.name,
            };

            this.store.dispatch(updateProfile(updatedProfileName));
            this.isEditMode = false;
        }
    }

    onLogout() {
        this.store.dispatch(logoutProfile());
    }
}
