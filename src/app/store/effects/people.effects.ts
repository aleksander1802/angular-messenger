import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { PeopleService } from 'src/app/yorha/services/people.service';
import * as peopleActions from '../actions/people.actions';
import { Store, select } from '@ngrx/store';
import { selectPeople } from '../selectors/people.selectors';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { TimerService } from 'src/app/yorha/services/timer.service';
import { PeopleLocalStorageService } from 'src/app/yorha/services/people-local-storage.service';

@Injectable()
export class PeopleEffects {
    constructor(
        private actions$: Actions,
        private peopleService: PeopleService,
        private store: Store,
        private toastService: ToastService,
        private timerService: TimerService,
        private peopleLocalStorageService: PeopleLocalStorageService
    ) {}

    loadPeople$ = createEffect(() =>
        this.actions$.pipe(
            ofType(peopleActions.loadPeopleList),
            withLatestFrom(this.store.pipe(select(selectPeople))),
            mergeMap(([action, peoples]) => {
                if (peoples) {
                    return of(peopleActions.loadPeopleListLoadingFalse());
                } else {
                    return this.peopleService.getPeopleList().pipe(
                        map((people) => {
                            const combinedPayload = {
                                people,
                                localStorageId: action,
                            };

                            this.peopleLocalStorageService.addPeopleListToStorage(
                                people.Items
                            );

                            return peopleActions.loadPeopleListSuccess(
                                combinedPayload
                            );
                        }),
                        catchError((error) => {
                            const errorMessage =
                                error.error.message || error.message;

                            this.toastService.showToast(errorMessage, true);
                            return of(
                                peopleActions.loadPeopleListFailure({ error })
                            );
                        })
                    );
                }
            })
        )
    );

    updatePeople$ = createEffect(() =>
        this.actions$.pipe(
            ofType(peopleActions.updatePeopleList),
            mergeMap((action) =>
                this.peopleService.getPeopleList().pipe(
                    map((people) => {
                        this.toastService.showToast(
                            'People list have been successfully updated',
                            false
                        );

                        const timerKey = 'peopleTimer';
                        const timerCountdown = 60;

                        this.timerService.setTimer(timerKey, timerCountdown);
                        this.timerService.startTimer(timerKey);

                        const combinedPayload = {
                            people,
                            localStorageId: action,
                        };

                        this.peopleLocalStorageService.addPeopleListToStorage(
                            people.Items
                        );

                        return peopleActions.updatePeopleListSuccess(
                            combinedPayload
                        );
                    }),
                    catchError((error) => {
                        const errorMessage =
                            error.error.message || error.message;

                        this.toastService.showToast(errorMessage, true);
                        return of(
                            peopleActions.updatePeopleListFailure({ error })
                        );
                    })
                )
            )
        )
    );
}
