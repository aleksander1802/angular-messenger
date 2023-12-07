import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    mergeMap,
    map,
    catchError,
    withLatestFrom,
    filter,
    switchMap,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as groupActions from '../actions/group.actions';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { GroupService } from 'src/app/yorha/services/group.service';
import { GroupItem } from 'src/app/yorha/models/group.interface';
import { selectGroup } from '../selectors/group.selectors';
import { TimerService } from 'src/app/yorha/services/timer.service';

@Injectable()
export class GroupEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private groupService: GroupService,
        private toastService: ToastService,
        private timerService: TimerService
    ) {}

    loadGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(groupActions.loadGroupList),
            withLatestFrom(this.store.pipe(select(selectGroup))),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            filter(([_action, groups]) => !groups),
            mergeMap(() =>
                this.groupService.getGroups().pipe(
                    map((groups) => {
                        return groupActions.loadGroupListSuccess(groups);
                    }),
                    catchError((error) => {
                        let errorMessage = error.message;

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

    updateGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(groupActions.updateGroupList),

            mergeMap(() =>
                this.groupService.getGroups().pipe(
                    map((groups) => {
                        this.toastService.showToast(
                            'Groups have been successfully updated',
                            false
                        );

                        this.timerService.setTimer('groupTimer', 60)
                        this.timerService.startTimer('groupTimer');
                        console.log('EFFECT DISPATCHFHWWGFHJWGH');

                        return groupActions.updateGroupListSuccess(groups);
                    }),
                    catchError((error) => {
                        let errorMessage = error.message;

                        if (error.status === 0) {
                            errorMessage = 'Internet connection lost';
                        } else {
                            errorMessage = error.error.message;
                        }

                        this.toastService.showToast(errorMessage, true);
                        return of(
                            groupActions.updateGroupListFailure({ error })
                        );
                    })
                )
            )
        )
    );

    createGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(groupActions.createGroup),
            switchMap((group) =>
                this.groupService.createGroup(group.name).pipe(
                    map((groupID) => {
                        const newGroup: GroupItem = {
                            id: {
                                S: groupID.groupID,
                            },
                            name: {
                                S: group.name,
                            },
                            createdAt: {
                                S: Date.now().toString(),
                            },
                            createdBy: {
                                S: group.createdBy,
                            },
                        };

                        this.toastService.showToast(
                            'The group was successfully created',
                            false
                        );

                        return groupActions.createGroupSuccess(newGroup);
                    }),
                    catchError((error) => {
                        let errorMessage = error.message;

                        if (error.status === 0) {
                            errorMessage = 'Internet connection lost';
                        } else {
                            errorMessage = error.error.message;
                        }

                        this.toastService.showToast(errorMessage, true);

                        return of(groupActions.createGroupFailure({ error }));
                    })
                )
            )
        )
    );

    deleteGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(groupActions.deleteGroup),
            switchMap(({ groupId }) =>
                this.groupService.deleteGroup(groupId).pipe(
                    map(() => {
                        this.toastService.showToast(
                            'The group was successfully deleted',
                            false
                        );

                        return groupActions.deleteGroupSuccess({ groupId });
                    }),
                    catchError((error) => {
                        let errorMessage = error.message;

                        if (error.status === 0) {
                            errorMessage = 'Internet connection lost';
                        } else {
                            errorMessage = error.error.message;
                        }

                        this.toastService.showToast(errorMessage, true);

                        return of(groupActions.deleteGroupFailure({ error }));
                    })
                )
            )
        )
    );
}
