import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    mergeMap,
    map,
    catchError,
    withLatestFrom,
    filter,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as profileActions from '../actions/profile.actions';
import { ProfileService } from '../../core/services/profile.service';
import { selectProfile } from '../selectors/profile.selectors';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Injectable()
export class ProfileEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private profileService: ProfileService,
        private toastService: ToastService
    ) {}

    loadProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(profileActions.loadProfile),
            withLatestFrom(this.store.pipe(select(selectProfile))),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            filter(([_action, profile]) => !profile),
            mergeMap(() =>
                this.profileService.getProfile().pipe(
                    map((profile) =>
                        profileActions.loadProfileSuccess({ profile })
                    ),
                    catchError((error) => {
                        let errorMessage = 'Unknown Error';

                        if (error.status === 0) {
                            errorMessage = 'Internet connection lost';
                        } else {
                            errorMessage = error.error.message;
                        }

                        this.toastService.showToast(errorMessage, true);
                        return of(profileActions.loadProfileFailure({ error }));
                    })
                )
            )
        )
    );
}
