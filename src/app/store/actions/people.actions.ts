import { createAction, props } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import {
    People,
    
} from 'src/app/yorha/models/people.interface';
import { PeopleActionType } from '../action-types/people-action.types';
import { LocalStorageAuthValue } from 'src/app/auth/models/login-response.interface';

export const loadPeopleList = createAction(
    PeopleActionType.PEOPLE_LIST_LOAD,
    props<LocalStorageAuthValue>()
);

export const loadPeopleListSuccess = createAction(
    PeopleActionType.PEOPLE_LIST_LOAD_SUCCESS,
    props<{ people: People; localStorageId: LocalStorageAuthValue }>()
);

export const loadPeopleListFailure = createAction(
    PeopleActionType.PEOPLE_LIST_LOAD_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const updatePeopleList = createAction(
    PeopleActionType.PEOPLE_LIST_UPDATE,
    props<LocalStorageAuthValue>()
);

export const updatePeopleListSuccess = createAction(
    PeopleActionType.PEOPLE_LIST_UPDATE_SUCCESS,
    props<{ people: People; localStorageId: LocalStorageAuthValue }>()
);

export const updatePeopleListFailure = createAction(
    PeopleActionType.PEOPLE_LIST_UPDATE_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const loadPeopleListLoadingFalse = createAction(
    PeopleActionType.PEOPLE_LIST_LOADING_FALSE
);
