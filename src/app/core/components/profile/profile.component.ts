import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
    loadProfile,
    logoutProfile,
    updateProfile,
} from 'src/app/store/actions/profile.actions';
import { selectProfile } from 'src/app/store/selectors/profile.selectors';
import { UserProfile, UserProfileName } from '../../models/profile.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    profile$: Observable<UserProfile | null> | undefined;
    isEditMode = false;
    profileForm: FormGroup | undefined;
    isloggedOut = false;

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit() {
        this.profile$ = this.store.pipe(select(selectProfile));
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
        if (this.isloggedOut) {
            return;
        }

        this.store
            .select(selectProfile)
            .pipe(take(3))
            .subscribe((data) => {
                if (data === null) {
                    this.isloggedOut = false;
                    localStorage.clear();

                    this.router.navigateByUrl('/auth/signin');
                } else {
                    this.isloggedOut = false;
                }
            });

        this.isloggedOut = true;
        this.store.dispatch(logoutProfile());
    }
}
