import { createReducer, on } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import { PeopleItem } from 'src/app/yorha/models/people.interface';
import * as peopleActions from '../actions/people.actions';

export const peopleFeatureKey = 'people';

export interface PeopleState {
    people: PeopleItem[] | null;
    peopleListLoading: boolean;
    error: ErrorFailure | null;
}

export const initialState: PeopleState = {
    people: null,
    peopleListLoading: false,
    error: null,
};

export const peopleReducer = createReducer(
    initialState,

    on(
        peopleActions.loadPeopleList,
        peopleActions.updatePeopleList,
        (state) => ({
            ...state,
            peopleListLoading: true,
        })
    ),

    on(peopleActions.loadPeopleListSuccess, (state, action) => {
        const peopleListWithoutMe = action.people.Items.filter(
            (people) => people.uid.S !== action.localStorageId.uid
        );
        return {
            ...state,
            people: peopleListWithoutMe,
            error: null,
            peopleListLoading: false,
        };
    }),

    on(
        peopleActions.loadPeopleListFailure,
        peopleActions.updatePeopleListFailure,
        (state, { error }) => ({
            ...state,
            error,
            peopleListLoading: false,
        })
    ),

    on(peopleActions.updatePeopleListSuccess, (state, action) => {
        const peopleListWithoutMe = action.people.Items.filter(
            (people) => people.uid.S !== action.localStorageId.uid
        );
        return {
            ...state,
            people: peopleListWithoutMe,
            error: null,
            peopleListLoading: false,
        };
    }),

    on(peopleActions.loadPeopleListLoadingFalse, (state) => ({
        ...state,
        peopleListLoading: false,
    }))
);
