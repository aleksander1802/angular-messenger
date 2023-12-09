import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { withLatestFrom, switchMap, of, map, catchError } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { GroupService } from 'src/app/yorha/services/group.service';
import { TimerService } from 'src/app/yorha/services/timer.service';
import { selectGroupConversations } from '../selectors/group-conversation.selectors';
import * as groupConversationActions from '../actions/group-conversation.actions';

@Injectable()
export class GroupConversationEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private groupService: GroupService,
        private toastService: ToastService,
        private timerService: TimerService
    ) {}

    loadGroupConversation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(groupConversationActions.loadGroupConversation),
            withLatestFrom(this.store.pipe(select(selectGroupConversations))),
            switchMap(([action, groupConversations]) => {
                const existingData = groupConversations?.[action.groupID];

                if (existingData && existingData.groupConversationItem) {
                    console.log('Messages already loaded:', existingData);
                    return of(
                        groupConversationActions.conversationLoadingFalse()
                    );
                } else {
                    return this.groupService
                        .getGroupMessages(action.groupID)
                        .pipe(
                            map((messages) => {
                                console.log('Effect: messages:', messages);

                                const sortedItems = messages.Items.sort(
                                    (a, b) =>
                                        a.createdAt.S.localeCompare(
                                            b.createdAt.S
                                        )
                                );

                                const combinedConversation = {
                                    groupID: action.groupID,
                                    items: sortedItems,
                                };

                                console.log(
                                    'Combined Conversation:',
                                    combinedConversation
                                );

                                return groupConversationActions.loadGroupConversationSuccess(
                                    combinedConversation
                                );
                            }),
                            catchError((error) =>
                                of(
                                    groupConversationActions.loadGroupConversationFailure(
                                        {
                                            groupID: action.groupID,
                                            error,
                                        }
                                    )
                                )
                            )
                        );
                }
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
                            console.log('action.groupID:', action.groupID);

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

                            console.log(
                                'Combined Conversation:',
                                combinedConversation
                            );

                            return groupConversationActions.updateGroupConversationSuccess(
                                combinedConversation
                            );
                        }),
                        catchError((error) =>
                            of(
                                groupConversationActions.updateGroupConversationFailure(
                                    {
                                        groupID: action.groupID,
                                        error,
                                    }
                                )
                            )
                        )
                    );
            })
        )
    );
}
