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
import * as groupActions from '../actions/group.actions';
import { selectProfile } from '../selectors/profile.selectors';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { GroupService } from 'src/app/yorha/services/group.service';

@Injectable()
export class GroupEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private groupService: GroupService,
        private toastService: ToastService
    ) {}

    loadGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(groupActions.loadGroupList),
            withLatestFrom(this.store.pipe(select(selectProfile))),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            filter(([_action, groups]) => !groups),
            mergeMap(() =>
                this.groupService.getGroups().pipe(
                    map((groups) => groupActions.loadGroupListSuccess(groups)),
                    catchError((error) => {
                        let errorMessage = 'Unknown Error';

                        if (error.status === 0) {
                            errorMessage = 'Internet connection lost';
                        } else {
                            errorMessage = error.error.message;
                        }

                        this.toastService.showToast(errorMessage, true);
                        return of(groupActions.loadGroupListFailure({ error }));
                    })
                )
            )
        )
    );
}
