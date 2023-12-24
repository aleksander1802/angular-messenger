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
            switchMap(({ groupID, since }) => {
                return this.groupService.getGroupMessages(groupID, since).pipe(
                    map((messages) => {
                        const items = messages.Items.sort((a, b) =>
                            a.createdAt.S.localeCompare(b.createdAt.S)
                        );

                        const combinedConversation = {
                            groupID,
                            items,
                        };

                        return groupConversationActions.loadGroupConversationSuccess(
                            combinedConversation
                        );
                    }),
                    catchError((error) => {
                        const errorMessage =
                            error.error.message || error.message;

                        this.toastService.showToast(errorMessage, true);

                        return of(
                            groupConversationActions.loadGroupConversationFailure(
                                {
                                    groupID,
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
            switchMap(({ groupID, since }) => {
                return this.groupService.getGroupMessages(groupID, since).pipe(
                    map((messages) => {
                        this.toastService.showToast(
                            'Group conversation have been successfully updated',
                            false
                        );

                        this.timerService.setTimer(groupID, 60);
                        this.timerService.startTimer(groupID);

                        const items = messages.Items.sort((a, b) =>
                            a.createdAt.S.localeCompare(b.createdAt.S)
                        );

                        const combinedConversation = {
                            groupID,
                            items,
                        };

                        return groupConversationActions.updateGroupConversationSuccess(
                            combinedConversation
                        );
                    }),
                    catchError((error) => {
                        const errorMessage =
                            error.error.message || error.message;

                        this.toastService.showToast(errorMessage, true);
                        return of(
                            groupConversationActions.updateGroupConversationFailure(
                                {
                                    groupID,
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
            switchMap(({ groupID, message, since }) => {
                return this.groupService
                    .sendGroupMessage(groupID, message)
                    .pipe(
                        map(() => {
                            this.toastService.showToast(
                                'The message has been sent successfully',
                                false
                            );

                            const combinedConversation = {
                                groupID,
                                since,
                            };

                            return groupConversationActions.sendGroupConversationMessageSuccess(
                                combinedConversation
                            );
                        }),
                        catchError((error) => {
                            const errorMessage =
                                error.error.message || error.message;

                            this.toastService.showToast(errorMessage, true);
                            return of(
                                groupConversationActions.sendGroupConversationMessageFailure(
                                    {
                                        groupID,
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
