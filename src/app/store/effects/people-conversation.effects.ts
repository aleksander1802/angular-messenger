import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { PeopleService } from 'src/app/yorha/services/people.service';
import { TimerService } from 'src/app/yorha/services/timer.service';
import * as peopleConversationActions from '../actions/people-conversation.actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { ConversationItem } from 'src/app/yorha/models/people.interface';

@Injectable()
export class PeopleConversationEffects {
    constructor(
        private actions$: Actions,
        private peopleService: PeopleService,
        private toastService: ToastService,
        private timerService: TimerService
    ) {}

    loadPeopleConversationList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(peopleConversationActions.loadConversationList),
            switchMap(() => {
                return this.peopleService.getConversationList().pipe(
                    map((conversations) => {
                        return peopleConversationActions.loadConversationListSuccess(
                            conversations
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
                            peopleConversationActions.loadConversationListFailure(
                                {
                                    error,
                                }
                            )
                        );
                    })
                );
            })
        )
    );

    createPeopleConversation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(peopleConversationActions.createConversation),
            switchMap(({ companion }) => {
                return this.peopleService.createConversation(companion).pipe(
                    map(({ conversationID }) => {
                        const conversationItem: ConversationItem = {
                            id: { S: conversationID },
                            companionID: { S: companion },
                        };

                        return peopleConversationActions.createConversationSuccess(
                            conversationItem
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
                            peopleConversationActions.createConversationFailure(
                                {
                                    error,
                                }
                            )
                        );
                    })
                );
            })
        )
    );

    deletePeopleConversation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(peopleConversationActions.deleteConversation),
            switchMap(({ conversationID }) => {
                return this.peopleService
                    .deleteConversation(conversationID)
                    .pipe(
                        map(() => {
                            return peopleConversationActions.deleteConversationSuccess(
                                { conversationID }
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
                                peopleConversationActions.deleteConversationFailure(
                                    {
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
