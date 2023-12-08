import { createReducer, on } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import { PeopleItem } from 'src/app/yorha/models/people.interface';
import * as peopleActions from '../actions/people.actions';

export const peopleFeatureKey = 'people';

export interface PeopleState {
    people: PeopleItem[] | null;
    peopleListLoading: boolean;
    conversationListLoading: boolean;
    error: ErrorFailure | null;
    isPeopleTimerRunning: boolean;
}

export const initialState: PeopleState = {
    people: null,
    peopleListLoading: false,
    conversationListLoading: false,
    error: null,
    isPeopleTimerRunning: false,
};

export const peopleReducer = createReducer(
    initialState,
    on(peopleActions.loadPeopleList, (state) => ({
        ...state,
        peopleListLoading: true,
    })),

    on(peopleActions.loadPeopleListSuccess, (state, action) => ({
        ...state,
        people: action.Items,
        error: null,
        peopleListLoading: false,
    })),

    on(peopleActions.loadPeopleListFailure, (state, { error }) => ({
        ...state,
        error,
        peopleListLoading: false,
    })),

    on(peopleActions.updatePeopleList, (state) => ({
        ...state,
        peopleListLoading: true,
    })),

    on(peopleActions.updatePeopleListSuccess, (state, action) => ({
        ...state,
        people: action.Items,
        error: null,
        peopleListLoading: false,
    })),

    on(peopleActions.updatePeopleListFailure, (state, { error }) => ({
        ...state,
        error,
        peopleListLoading: false,
    })),

    on(peopleActions.loadPeopleListLoadingFalse, (state) => ({
        ...state,
        peopleListLoading: false,
    }))
);
