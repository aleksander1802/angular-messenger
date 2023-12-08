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

@Injectable()
export class PeopleEffects {
    constructor(
        private actions$: Actions,
        private peopleService: PeopleService,
        private store: Store,
        private toastService: ToastService,
        private timerService: TimerService
    ) {}

    loadPeople$ = createEffect(() =>
        this.actions$.pipe(
            ofType(peopleActions.loadPeopleList),
            withLatestFrom(this.store.pipe(select(selectPeople))),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            mergeMap(([_action, peoples]) => {
                if (peoples) {
                    return of(peopleActions.loadPeopleListLoadingFalse);
                } else {
                    return this.peopleService.getPeopleList().pipe(
                        map((people) =>
                            peopleActions.loadPeopleListSuccess(people)
                        ),
                        catchError((error) => {
                            let errorMessage = error.message;

                            if (error.status === 0) {
                                errorMessage = 'Internet connection lost';
                            } else {
                                errorMessage = error.error.message;
                            }

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
}
