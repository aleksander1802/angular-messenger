import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProfile } from 'src/app/store/actions/profile.actions';
import { selectProfile } from 'src/app/store/selectors/profile.selectors';
import { UserProfile } from '../../models/profile.interface';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    profile$: Observable<UserProfile | null> | undefined;

    constructor(private store: Store) {}

    ngOnInit() {
        this.profile$ = this.store.pipe(select(selectProfile));

        this.store.dispatch(loadProfile());
    }
}
