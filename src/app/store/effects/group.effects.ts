import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    mergeMap,
    map,
    catchError,
    withLatestFrom,
    switchMap,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as groupActions from '../actions/group.actions';

import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { GroupService } from 'src/app/yorha/services/group.service';
import { GroupItem } from 'src/app/yorha/models/group.interface';
import { selectGroup } from '../selectors/group.selectors';
import { TimerService } from 'src/app/yorha/services/timer.service';
import { Router } from '@angular/router';
import { GroupStorageService } from 'src/app/yorha/services/group-local-storage.service';

@Injectable()
export class GroupEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private groupStorageService: GroupStorageService,
        private groupService: GroupService,
        private toastService: ToastService,
        private timerService: TimerService,
        private router: Router
    ) {}

    loadGroup$ = createEffect(() =>
        this.actions$.pipe( 
            ofType(groupActions.loadGroupList),
            withLatestFrom(this.store.pipe(select(selectGroup))),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            mergeMap(([_action, groups]) => {
                if (groups) {
                    return of(groupActions.loadGroupListUpdateLoading());
                } else {
                    return this.groupService.getGroups().pipe(
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
                            return of(
                                groupActions.loadGroupListFailure({ error })
                            );
                        })
                    );
                }
            })
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

                        this.timerService.setTimer('groupTimer', 60);
                        this.timerService.startTimer('groupTimer');

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
                        this.groupStorageService.addMyGroupToStorage(
                            groupID.groupID
                        );

                        this.toastService.showToast(
                            'The group was successfully created',
                            false
                        );
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
            switchMap(({ groupID }) =>
                this.groupService.deleteGroup(groupID).pipe(
                    map(() => {
                        this.groupStorageService.removeMyGroupFromStorage(
                            groupID
                        );

                        this.toastService.showToast(
                            'The group was successfully deleted',
                            false
                        );

                        const currentPath = this.router.url;

                        if (currentPath.startsWith('/group/')) {
                            this.router.navigate(['/']);
                        }

                        return groupActions.deleteGroupSuccess({ groupID });
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
