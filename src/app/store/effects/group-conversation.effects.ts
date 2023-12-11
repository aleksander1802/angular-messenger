import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, of, map, catchError } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { GroupService } from 'src/app/yorha/services/group.service';
import { TimerService } from 'src/app/yorha/services/timer.service';
import * as groupConversationActions from '../actions/group-conversation.actions';

@Injectable()
export class GroupConversationEffects {
    constructor(
        private actions$: Actions,
        private groupService: GroupService,
        private toastService: ToastService,
        private timerService: TimerService
    ) {}

    loadGroupConversation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(groupConversationActions.loadGroupConversation),
            switchMap((action) => {
                return this.groupService
                    .getGroupMessages(action.groupID, action.since)
                    .pipe(
                        map((messages) => {
                            const sortedItems = messages.Items.sort((a, b) =>
                                a.createdAt.S.localeCompare(b.createdAt.S)
                            );

                            const combinedConversation = {
                                groupID: action.groupID,
                                items: sortedItems,
                            };

                            return groupConversationActions.loadGroupConversationSuccess(
                                combinedConversation
                            );
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
                                groupConversationActions.loadGroupConversationFailure(
                                    {
                                        groupID: action.groupID,
                                        error,
                                    }
                                )
                            );
                        })
                    );
            })
        )
    );

    updateGroupConversation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(groupConversationActions.updateGroupConversation),
            switchMap((action) => {
                return this.groupService
                    .getGroupMessages(action.groupID, action.since)
                    .pipe(
                        map((messages) => {
                            this.toastService.showToast(
                                'Group conversation have been successfully updated',
                                false
                            );

                            this.timerService.setTimer(action.groupID, 60);
                            this.timerService.startTimer(action.groupID);

                            const sortedItems = messages.Items.sort((a, b) =>
                                a.createdAt.S.localeCompare(b.createdAt.S)
                            );

                            const combinedConversation = {
                                groupID: action.groupID,
                                items: sortedItems,
                            };

                            return groupConversationActions.updateGroupConversationSuccess(
                                combinedConversation
                            );
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
                                groupConversationActions.updateGroupConversationFailure(
                                    {
                                        groupID: action.groupID,
                                        error,
                                    }
                                )
                            );
                        })
                    );
            })
        )
    );

    sendGroupConversationMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(groupConversationActions.sendGroupConversationMessage),
            switchMap((action) => {
                return this.groupService
                    .sendGroupMessage(action.groupID, action.message)
                    .pipe(
                        map(() => {
                            this.toastService.showToast(
                                'The message has been sent successfully',
                                false
                            );

                            const combinedConversation = {
                                groupID: action.groupID,
                                since: action.since,
                            };

                            return groupConversationActions.sendGroupConversationMessageSuccess(
                                combinedConversation
                            );
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
                                groupConversationActions.sendGroupConversationMessageFailure(
                                    {
                                        groupID: action.groupID,
                                        error,
                                    }
                                )
                            );
                        })
                    );
            })
        )
    );
}
