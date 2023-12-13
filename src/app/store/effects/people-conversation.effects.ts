import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { PeopleService } from 'src/app/yorha/services/people.service';
import { TimerService } from 'src/app/yorha/services/timer.service';
import * as peopleConversationActions from '../actions/people-conversation.actions';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { ConversationItem } from 'src/app/yorha/models/people.interface';
import { Router } from '@angular/router';
import { PeopleLocalStorageService } from 'src/app/yorha/services/people-local-storage.service';
import { Store, select } from '@ngrx/store';
import { selectPeopleConversationList } from '../selectors/people-conversation.selectors';

@Injectable()
export class PeopleConversationEffects {
    constructor(
        private actions$: Actions,
        private peopleService: PeopleService,
        private toastService: ToastService,
        private timerService: TimerService,
        private router: Router,
        private peopleLocalStorageService: PeopleLocalStorageService,
        private store: Store
    ) {}

    loadPeopleConversationList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(peopleConversationActions.loadConversationList),
            withLatestFrom(
                this.store.pipe(select(selectPeopleConversationList))
            ),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            switchMap(([_action, conversation]) => {
                if (conversation) {
                    return of(
                        peopleConversationActions.conversationListLoadingFalse()
                    );
                } else {
                    return this.peopleService.getConversationList().pipe(
                        map((conversations) => {

                            'Обновляем список бесед'
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
                }
            })
        )
    );

    createPeopleConversation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(peopleConversationActions.createConversation),
            switchMap(({ companion }) => {
                return this.peopleService.createConversation(companion).pipe(
                    map(({ conversationID }) => {
                        this.peopleLocalStorageService.addMyConversationToStorage(
                            conversationID
                        );

                        const conversationItem: ConversationItem = {
                            id: { S: conversationID },
                            companionID: { S: companion },
                        };

                        this.toastService.showToast(
                            'Conversation created successfully',
                            false
                        );

                        this.router.navigate(['conversation', conversationID]);

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
                            this.peopleLocalStorageService.removeMyConversationFromStorage(
                                conversationID
                            );

                            this.toastService.showToast(
                                'The conversation was successfully deleted',
                                false
                            );

                            this.router.navigate(['/']);

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

    loadConversationMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(peopleConversationActions.loadConversationMessage),
            switchMap(({ conversationID, since }) => {
                return this.peopleService
                    .getConversationMessages(conversationID, since)
                    .pipe(
                        map((messages) => {
                            const items = messages.Items.sort((a, b) =>
                                a.createdAt.S.localeCompare(b.createdAt.S)
                            );

                            const combinedConversation = {
                                conversationID,
                                items,
                            };

                            return peopleConversationActions.loadConversationMessageSuccess(
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
                                peopleConversationActions.loadConversationMessageFailure(
                                    {
                                        conversationID,
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
            ofType(peopleConversationActions.updateConversationMessage),
            switchMap(({ conversationID, since }) => {
                return this.peopleService
                    .getConversationMessages(conversationID, since)
                    .pipe(
                        map((messages) => {
                            this.toastService.showToast(
                                'Conversation have been successfully updated',
                                false
                            );

                            this.timerService.setTimer(conversationID, 60);
                            this.timerService.startTimer(conversationID);

                            const items = messages.Items.sort((a, b) =>
                                a.createdAt.S.localeCompare(b.createdAt.S)
                            );

                            const combinedConversation = {
                                conversationID,
                                items,
                            };

                            return peopleConversationActions.updateConversationMessageSuccess(
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
                                peopleConversationActions.updateConversationMessageFailure(
                                    {
                                        conversationID,
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
            ofType(peopleConversationActions.sendConversationMessage),
            switchMap(({ conversationID, message, since }) => {
                return this.peopleService
                    .sendConversationMessage(conversationID, message)
                    .pipe(
                        map(() => {
                            this.toastService.showToast(
                                'The message has been sent successfully',
                                false
                            );

                            const combinedConversation = {
                                conversationID,
                                since,
                            };

                            return peopleConversationActions.sendConversationMessageSuccess(
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
                                peopleConversationActions.sendConversationMessageFailure(
                                    {
                                        conversationID,
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
